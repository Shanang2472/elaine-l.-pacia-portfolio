import { useEffect, useRef } from 'react';

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function hex2(a: number): string {
  return Math.round(Math.min(1, Math.max(0, a)) * 255).toString(16).padStart(2, '0');
}

// ─── Colour palettes ─────────────────────────────────────────────────────────
const PETAL_COLORS: [string, string][] = [
  ['#F7A8BB', '#BE2A52'],
  ['#F4C2D0', '#D4617A'],
  ['#FADADD', '#BE2A52'],
  ['#E8637F', '#9E1F42'],
  ['#FFB6C1', '#C94070'],
];

const HEART_COLORS: [string, string, string][] = [
  ['#FF8FAB', '#BE2A52', '#6B0F2A'], // vivid pink
  ['#FF4D6D', '#9E1F42', '#560D1F'], // deep red
  ['#FADADD', '#D4617A', '#7A1F3A'], // pale blush
  ['#FF6B8A', '#C94070', '#7A1535'], // coral
  ['#FFB3C6', '#E05070', '#8B1A30'], // soft pink
];

const BALLOON_COLORS: [string, string][] = [
  ['#FFB3C6', '#FF4D6D'], // pink
  ['#FF8FAB', '#BE2A52'], // rose
  ['#FADADD', '#F4C2D0'], // blush
  ['#FF6B8A', '#C94070'], // coral
  ['#FFD6E0', '#FF8FAB'], // pale pink
  ['#E8637F', '#9E1F42'], // deep rose
];

type Kind = 'petal' | 'heart' | 'balloon';

interface Particle {
  kind: Kind;
  x: number; y: number; z: number;
  // 3-D angles
  rx: number; ry: number; rz: number;
  drx: number; dry: number; drz: number;
  vy: number; vx: number; vz: number;
  wobble: number; wobbleAmp: number;
  size: number;
  colorIdx: number;
  opacity: number;
}

// ─── Path builders ────────────────────────────────────────────────────────────

function petalPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const hw = w / 2;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.5);
  ctx.bezierCurveTo(-hw * 1.1, h * 0.3, -hw * 0.9, -h * 0.4, 0, -h * 0.5);
  ctx.bezierCurveTo(hw * 0.9, -h * 0.4, hw * 1.1, h * 0.3, 0, h * 0.5);
  ctx.closePath();
}

/**
 * Heart centred at (0,0) using 4 bezier curves.
 * Fits roughly in ±s×±s.  Bottom tip at (0, +s).
 */
function heartPath(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, s);                              // bottom tip ▼
  // left side up
  ctx.bezierCurveTo(-s * 0.1, s * 0.6, -s * 1.15, s * 0.25, -s, -s * 0.1);
  // left lobe arc to centre cleft
  ctx.bezierCurveTo(-s, -s * 0.72, -s * 0.38, -s, 0, -s * 0.5);
  // centre cleft to right lobe arc
  ctx.bezierCurveTo(s * 0.38, -s, s, -s * 0.72, s, -s * 0.1);
  // right side down to tip
  ctx.bezierCurveTo(s * 1.15, s * 0.25, s * 0.1, s * 0.6, 0, s);
  ctx.closePath();
}

/**
 * Balloon body — slightly teardrop oval.
 * Knot is a small rounded triangle at the bottom.
 */
function balloonBodyPath(ctx: CanvasRenderingContext2D, rw: number, rh: number) {
  // Main body: squashed circle, wider at middle, tapering at bottom
  ctx.beginPath();
  ctx.moveTo(0, rh);                       // bottom-centre knot attachment
  ctx.bezierCurveTo(-rw * 0.35, rh * 0.85, -rw, rh * 0.5, -rw, 0);
  ctx.bezierCurveTo(-rw, -rh * 0.75, -rw * 0.5, -rh, 0, -rh);
  ctx.bezierCurveTo(rw * 0.5, -rh, rw, -rh * 0.75, rw, 0);
  ctx.bezierCurveTo(rw, rh * 0.5, rw * 0.35, rh * 0.85, 0, rh);
  ctx.closePath();
}

// ─── Render helpers ───────────────────────────────────────────────────────────

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle, t: number) {
  const perspScale = 0.5 + 0.5 * p.z;
  const scaleX = Math.cos(p.ry) * perspScale;
  const scaleY = Math.cos(p.rx) * perspScale;
  const bright  = 0.75 + 0.25 * Math.cos(p.rx + p.ry);
  const sway    = Math.sin(t * 0.0007 + p.wobble) * p.wobbleAmp;
  const [c0, c1] = PETAL_COLORS[p.colorIdx % PETAL_COLORS.length];
  const pw = p.size, ph = p.size * 1.6;

  ctx.save();
  ctx.translate(p.x + sway, p.y);
  ctx.rotate(p.rz);
  ctx.scale(scaleX, scaleY);

  const grd = ctx.createLinearGradient(0, -ph / 2, 0, ph / 2);
  grd.addColorStop(0,    c0 + hex2(p.opacity * bright));
  grd.addColorStop(0.55, c1 + hex2(p.opacity * bright * 0.9));
  grd.addColorStop(1,    c0 + hex2(p.opacity * bright * 0.6));
  petalPath(ctx, pw, ph);
  ctx.fillStyle = grd;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, -ph * 0.42);
  ctx.lineTo(0,  ph * 0.42);
  ctx.strokeStyle = c1 + hex2(p.opacity * 0.2);
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, p: Particle, t: number) {
  // Hearts: only gentle rz spin + mild ry tilt — never go fully edge-on
  const clampedRy  = Math.sin(p.ry) * 0.55;   // softer depth tilt
  const perspScale = 0.6 + 0.4 * p.z;
  const scaleX     = (1 - Math.abs(clampedRy) * 0.5) * perspScale;
  const scaleY     = perspScale;
  const sway       = Math.sin(t * 0.0006 + p.wobble) * p.wobbleAmp * 0.7;

  const [c0, c1, c2] = HEART_COLORS[p.colorIdx % HEART_COLORS.length];
  const s = p.size;

  ctx.save();
  ctx.translate(p.x + sway, p.y);
  ctx.rotate(p.rz);
  ctx.scale(scaleX, scaleY);

  // 3-D radial gradient: bright highlight upper-left → mid colour → deep shadow
  const gr = ctx.createRadialGradient(
    -s * 0.25, -s * 0.5, s * 0.05,
     s * 0.1,   s * 0.1, s * 1.4,
  );
  gr.addColorStop(0,    '#FFE0EA' + hex2(p.opacity));        // specular
  gr.addColorStop(0.25, c0        + hex2(p.opacity * 0.98));
  gr.addColorStop(0.65, c1        + hex2(p.opacity * 0.95));
  gr.addColorStop(1,    c2        + hex2(p.opacity * 0.80));

  heartPath(ctx, s);
  ctx.fillStyle = gr;
  ctx.fill();

  // Thin rose outline for crispness
  ctx.strokeStyle = c2 + hex2(p.opacity * 0.35);
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Specular glint — small white oval upper-left
  ctx.save();
  ctx.globalAlpha = p.opacity * 0.45;
  ctx.translate(-s * 0.3, -s * 0.55);
  ctx.scale(1, 0.55);
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

function drawBalloon(ctx: CanvasRenderingContext2D, p: Particle, t: number) {
  const perspScale = 0.55 + 0.45 * p.z;
  // Balloons face forward — only gentle rz sway
  const sway = Math.sin(t * 0.00055 + p.wobble) * p.wobbleAmp * 0.5;

  const [c0, c1] = BALLOON_COLORS[p.colorIdx % BALLOON_COLORS.length];
  const rw = p.size;         // half-width
  const rh = p.size * 1.3;  // half-height

  ctx.save();
  ctx.translate(p.x + sway, p.y);
  ctx.scale(perspScale, perspScale);
  ctx.rotate(p.rz * 0.3); // subtle lean

  // ── String ───────────────────────────────────────────────────────────────
  const stringLen = rh * 2.8;
  ctx.beginPath();
  ctx.moveTo(0, rh);
  ctx.quadraticCurveTo(
    rw * 0.5, rh + stringLen * 0.5,
    rw * 0.1, rh + stringLen,
  );
  ctx.strokeStyle = c1 + hex2(p.opacity * 0.55);
  ctx.lineWidth = 1;
  ctx.stroke();

  // ── Balloon body ─────────────────────────────────────────────────────────
  // 3-D radial gradient: bright top-left → mid → dark bottom
  const gr = ctx.createRadialGradient(
    -rw * 0.28, -rh * 0.42, rw * 0.08,
     rw * 0.1,   rh * 0.1,  rw * 1.6,
  );
  gr.addColorStop(0,    '#FFE8EF' + hex2(p.opacity));
  gr.addColorStop(0.3,  c0        + hex2(p.opacity * 0.95));
  gr.addColorStop(0.75, c1        + hex2(p.opacity * 0.9));
  gr.addColorStop(1,    '#5A0A1E' + hex2(p.opacity * 0.65));

  balloonBodyPath(ctx, rw, rh);
  ctx.fillStyle = gr;
  ctx.fill();
  ctx.strokeStyle = c1 + hex2(p.opacity * 0.3);
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Specular highlight
  ctx.save();
  ctx.globalAlpha = p.opacity * 0.5;
  ctx.translate(-rw * 0.3, -rh * 0.45);
  ctx.scale(1, 1.3);
  ctx.beginPath();
  ctx.arc(0, 0, rw * 0.32, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.restore();

  // Knot — tiny dark teardrop at bottom
  ctx.beginPath();
  ctx.arc(0, rh + 4, 4, 0, Math.PI * 2);
  ctx.fillStyle = c1 + hex2(p.opacity * 0.9);
  ctx.fill();

  ctx.restore();
}

// ─── Particle factory ─────────────────────────────────────────────────────────

function makeParticle(kind: Kind, W: number, H: number, fromTop = false): Particle {
  const sizes: Record<Kind, [number, number]> = {
    petal:   [14, 38],
    heart:   [22, 42],   // hearts are bigger so they're clearly visible
    balloon: [22, 40],
  };
  const [sMin, sMax] = sizes[kind];

  // Balloons rise or fall very slowly; petals/hearts fall normally
  const vy = kind === 'balloon'
    ? rand(-0.6, 0.3)   // mostly rising
    : rand(0.5, 1.5);

  return {
    kind,
    x: rand(0, W),
    y: fromTop
      ? rand(-200, -20)
      : kind === 'balloon' ? rand(H * 0.2, H * 1.1) : rand(-H, H),
    z: rand(0, 1),
    rx:  rand(0, Math.PI * 2),
    ry:  rand(0, Math.PI * 2),
    rz:  rand(-Math.PI, Math.PI),
    drx: kind === 'balloon' ? rand(-0.004, 0.004) : rand(-0.013, 0.013),
    dry: rand(-0.016, 0.016),
    drz: kind === 'balloon' ? rand(-0.004, 0.004) : rand(-0.009, 0.009),
    vy,
    vx: rand(-0.25, 0.25),
    vz: rand(-0.002, 0.002),
    wobble:    rand(0, Math.PI * 2),
    wobbleAmp: rand(10, 30),
    size: rand(sMin, sMax),
    colorIdx: Math.floor(rand(0, 10)), // ample range
    opacity: kind === 'heart' ? rand(0.75, 1.0) : rand(0.55, 0.9),
  };
}

// ─── Counts ───────────────────────────────────────────────────────────────────
const COUNTS: Record<Kind, number> = {
  petal:   22,
  heart:   16,
  balloon: 10,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function FloatingObjects() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Spawn all kinds
    const all: Particle[] = (Object.keys(COUNTS) as Kind[]).flatMap((kind) =>
      Array.from({ length: COUNTS[kind] }, () => makeParticle(kind, W(), H(), false)),
    );
    // Sort by depth: far objects draw first
    all.sort((a, b) => a.z - b.z);
    particlesRef.current = all;

    let t = 0;
    const tick = () => {
      t += 16;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.y  += p.vy;
        p.x  += p.vx;
        p.z   = Math.max(0, Math.min(1, p.z + p.vz));
        p.rx += p.drx;
        p.ry += p.dry;
        p.rz += p.drz;

        // Micro-flutter (only petals/hearts)
        if (p.kind !== 'balloon') {
          p.drx += rand(-0.0004, 0.0004);
          p.dry += rand(-0.0004, 0.0004);
          p.drx  = Math.max(-0.022, Math.min(0.022, p.drx));
          p.dry  = Math.max(-0.028, Math.min(0.028, p.dry));
        }

        // Recycle: balloons recycle at top (they rise), others at bottom
        const offscreen = p.kind === 'balloon' ? p.y < -300 : p.y > h + 100;
        if (offscreen) {
          Object.assign(p, makeParticle(p.kind, w, h, p.kind !== 'balloon'));
          if (p.kind === 'balloon') {
            p.y  = h + rand(20, 80); // re-enter from bottom
            p.vy = rand(-0.7, -0.2); // ensure it's rising
          }
        }

        // Draw
        if (p.kind === 'petal')   drawPetal(ctx, p, t);
        if (p.kind === 'heart')   drawHeart(ctx, p, t);
        if (p.kind === 'balloon') drawBalloon(ctx, p, t);
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
