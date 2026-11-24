import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
}

export function AudioPlayer({
  src = '/audio/elaine-theme.mp3',
  title = "Elaine's Journey",
  artist = 'Theme Soundtrack',
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35); // Gentle starting volume (35%)
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  // Initialize and handle autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    // Attempt direct autoplay
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      })
      .catch(() => {
        // Autoplay blocked by browser policy prior to user interaction
        setIsPlaying(false);
        setShowPrompt(true);
      });

    // Auto-unlock on first user interaction if not manually paused
    const unlockAudioOnGesture = () => {
      if (!audioRef.current || userManuallyPausedRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setShowPrompt(false);
          })
          .catch(() => {
            // Still waiting for direct click
          });
      }
      cleanupGestureListeners();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
      window.removeEventListener('scroll', unlockAudioOnGesture);
    };

    window.addEventListener('pointerdown', unlockAudioOnGesture, { once: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { once: true });
    window.addEventListener('scroll', unlockAudioOnGesture, { once: true });

    return () => {
      cleanupGestureListeners();
    };
  }, []);

  // Synchronize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setShowPrompt(false);
    if (isPlaying) {
      userManuallyPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userManuallyPausedRef.current = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio playback error:', err);
        });
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <aside
      aria-label="Background music player"
      className="no-print fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none"
    >
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Gentle First-Visit Prompt if Autoplay was deferred */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-2 mr-1 flex items-center gap-2 rounded-full border border-[#BE2A52]/25 bg-white/95 px-3.5 py-1.5 shadow-lg shadow-[#BE2A52]/10 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BE2A52] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BE2A52]"></span>
            </span>
            <span className="text-xs font-medium text-[#18181B]">
              🎵 Background music available
            </span>
            <button
              type="button"
              onClick={togglePlay}
              className="ml-1 rounded-full bg-[#BE2A52] px-2.5 py-0.5 text-[11px] font-semibold text-white transition hover:bg-[#9E1F42] cursor-pointer active:scale-95"
            >
              Play
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glassmorphism Player Pill */}
      <motion.div
        layout
        className="group relative flex items-center rounded-2xl border border-[#EAE3E6] bg-white/95 p-1.5 sm:p-2 shadow-xl shadow-[#18181B]/5 backdrop-blur-md transition-all duration-300 hover:border-[#BE2A52]/30 hover:shadow-[#BE2A52]/10"
      >
        {/* Animated Vinyl Disc Icon / Master Play Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          title={isPlaying ? 'Pause music' : 'Play music'}
          className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#BE2A52] to-[#E8637F] text-white shadow-md transition-transform duration-200 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52]"
        >
          <Disc3
            className={`h-5 w-5 ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          />
          {/* Overlay Play/Pause Icon on hover */}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 fill-white text-white translate-x-0.5" />
            )}
          </span>
        </button>

        {/* Detailed Controls (Expandable) */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex items-center"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-3 pr-1 sm:pr-2 whitespace-nowrap">
                {/* Track Info & Animated Equalizer */}
                <div className="flex flex-col justify-center min-w-[100px] sm:min-w-[120px] max-w-[150px]">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-semibold text-[#18181B]">
                      {title}
                    </span>
                    {isPlaying && (
                      <div className="flex items-end gap-0.5 h-3 shrink-0">
                        <span className="w-0.5 bg-[#BE2A52] rounded-full h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                        <span className="w-0.5 bg-[#BE2A52] rounded-full h-2/3 animate-[pulse_0.8s_ease-in-out_infinite]" />
                        <span className="w-0.5 bg-[#BE2A52] rounded-full h-4/5 animate-[pulse_0.7s_ease-in-out_infinite]" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#71717A] tracking-wider uppercase font-mono truncate">
                    {isPlaying ? 'Now Playing' : 'Music Paused'}
                  </span>
                </div>

                {/* Primary Play/Pause Toggle Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  title={isPlaying ? 'Pause' : 'Play'}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FCFAFA] border border-[#E6DFE2] text-[#18181B] transition hover:bg-[#FAF6F7] hover:border-[#BE2A52] cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="h-3.5 w-3.5 text-[#BE2A52]" />
                  ) : (
                    <Play className="h-3.5 w-3.5 text-[#BE2A52] fill-[#BE2A52] translate-x-0.5" />
                  )}
                </button>

                {/* Mute/Unmute & Volume Slider */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#71717A] transition hover:text-[#BE2A52] cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Music volume"
                    title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                    className="h-1.5 w-12 sm:w-16 cursor-pointer accent-[#BE2A52] bg-[#EAE3E6] rounded-lg transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse/Expand Toggle Arrow */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
          title={isExpanded ? 'Minimize player' : 'Expand controls'}
          className="flex h-6 w-6 items-center justify-center rounded-full text-[#A1A1AA] transition hover:bg-[#FAF6F7] hover:text-[#18181B] cursor-pointer"
        >
          {isExpanded ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </motion.div>
    </aside>
  );
}
