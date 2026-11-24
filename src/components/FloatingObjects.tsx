import { useEffect, useRef } from 'react';

// ─── Petal colours (rose / blush palette) ───────────────────────────────────
const PETAL_COLORS: [string, string][] = [
  ['#F7A8BB', '#BE2A52'], // bright pink → deep rose
  ['#F4C2D0', '#D4617A'], // blush → mid rose
  ['#FADADD', '#BE2A52'], // pale blush → deep rose
  ['#E8637F', '#9E1F42'], // coral rose → dark rose
  ['#FFB6C1', '#C94070'], // light pink → medium rose
  ['#F9D0D8', '#E05070'], // pale → medium coral
];

interface Petal {
  // position
  x: number;
  y: number;
  z: number; // depth (0=far, 1=near)

  // 3-D rotation angles
  rx: number; // tilt (like looking at petal face-on vs sideways)
  ry: number; // spin around vertical axis
  rz: number; // in-plane roll

  // angular velocities
  drx: number;
  dry: number;
  drz: number;

  // fall / drift
  vy: number;    // fall speed
  vx: number;   // horizontal drift
  vz: number;   // depth drift (subtle)
  wobble: number; // phase offset for sinusoidal sway
  wobbleAmp: number;

  // visual
  size: number;
  colorIdx: number;
  opacity: number;
  targetOpacity: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/** Draw a single rose-petal bezier shape centred at (0,0). */
function drawPetalPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // A petal is two symmetric cubic bezier curves meeting at tip & base
  const hw = w / 2;
  ctx.beginPath();
  // Start at base centre
  ctx.moveTo(0, h * 0.5);
  // Left side → tip
  ctx.bezierCurveTo(-hw * 1.1, h * 0.3, -hw * 0.9, -h * 0.4, 0, -h * 0.5);
  // Right side ← tip
  ctx.bezierCurveTo(hw * 0.9, -h * 0.4, hw * 1.1, h * 0.3, 0, h * 0.5);
  ctx.closePath();
}

/** Project 3-D rotation onto 2-D canvas (simple perspective). */
function project(
  ctx: CanvasRenderingContext2D,
  petal: Petal,
  t: number,
) {
  const { rx, ry, rz, size, wobble, wobbleAmp, vx: _vx } = petal;

  // Perspective scale: z=0 → 0.55×, z=1 → 1.0×
  const perspScale = 0.55 + 0.45 * petal.z;

  // 3-D squish along Y to simulate tilt (rx) and X to simulate ry
  const scaleX = Math.cos(ry) * perspScale; // cos(ry) → how much width is visible
  const scaleY = Math.cos(rx) * perspScale; // cos(rx) → how much height is visible

  // The sign of cos tells us which "face" is showing (front/back)
  const brightness = 0.78 + 0.22 * Math.cos(rx + ry);

  const petalW = size;
  const petalH = size * 1.55; // petals are taller than wide

  ctx.save();

  // Horizontal sway (sinusoidal)
  const sway = Math.sin(t * 0.0007 + wobble) * wobbleAmp;

  ctx.translate(petal.x + sway, petal.y);
  ctx.rotate(rz);
  ctx.scale(scaleX, scaleY);

  // Gradient fill mimicking 3-D lighting
  const [c0, c1] = PETAL_COLORS[petal.colorIdx];
  const grd = ctx.createLinearGradient(0, -petalH * 0.5, 0, petalH * 0.5);
  grd.addColorStop(0, c0 + hexAlpha(petal.opacity * brightness));
  grd.addColorStop(0.55, c1 + hexAlpha(petal.opacity * brightness * 0.9));
  grd.addColorStop(1, c0 + hexAlpha(petal.opacity * brightness * 0.6));

  drawPetalPath(ctx, petalW, petalH);
  ctx.fillStyle = grd;
  ctx.fill();

  // Thin vein line down the centre for realism
  ctx.beginPath();
  ctx.moveTo(0, -petalH * 0.42);
  ctx.lineTo(0, petalH * 0.42);
  ctx.strokeStyle = c1 + hexAlpha(petal.opacity * 0.22);
  ctx.lineWidth = 0.6;
  ctx.stroke();

  ctx.restore();
}

/** Convert 0–1 opacity to 2-hex-digit alpha string. */
function hexAlpha(alpha: number): string {
  const a = Math.min(1, Math.max(0, alpha));
  return Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
}

function makePetal(canvasW: number, canvasH: number, fromTop = false): Petal {
  return {
    x: rand(0, canvasW),
    y: fromTop ? rand(-120, -20) : rand(-canvasH, canvasH),
    z: rand(0, 1),
    rx: rand(0, Math.PI * 2),
    ry: rand(0, Math.PI * 2),
    rz: rand(-Math.PI, Math.PI),
    drx: rand(-0.012, 0.012),
    dry: rand(-0.016, 0.016),
    drz: rand(-0.008, 0.008),
    vy: rand(0.55, 1.6),
    vx: rand(-0.25, 0.25),
    vz: rand(-0.002, 0.002),
    wobble: rand(0, Math.PI * 2),
    wobbleAmp: rand(12, 36),
    size: rand(14, 40),
    colorIdx: Math.floor(rand(0, PETAL_COLORS.length)),
    opacity: rand(0.55, 0.92),
    targetOpacity: rand(0.55, 0.92),
  };
}

const PETAL_COUNT = 38;

export function FloatingObjects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Sizing ──────────────────────────────────────────────────────────────
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Spawn petals ────────────────────────────────────────────────────────
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    petalsRef.current = Array.from({ length: PETAL_COUNT }, () =>
      makePetal(W(), H(), false),
    );

    // ── Animation loop ──────────────────────────────────────────────────────
    let t = 0;
    const tick = () => {
      t += 16;
      const w = W();
      const h = H();

      ctx.clearRect(0, 0, w, h);

      petalsRef.current.forEach((p) => {
        // Update position
        p.y += p.vy;
        p.x += p.vx;
        p.z = Math.max(0, Math.min(1, p.z + p.vz));

        // Update 3-D angles
        p.rx += p.drx;
        p.ry += p.dry;
        p.rz += p.drz;

        // Slight drag / flutter on drx/dry
        p.drx += rand(-0.0005, 0.0005);
        p.dry += rand(-0.0005, 0.0005);
        p.drx = Math.max(-0.022, Math.min(0.022, p.drx));
        p.dry = Math.max(-0.028, Math.min(0.028, p.dry));

        // Recycle when off-screen bottom
        if (p.y > h + 60) {
          Object.assign(p, makePetal(w, h, true));
        }

        project(ctx, p, t);
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />
  );
}
