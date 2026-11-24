import { useState } from 'react';
import { ArrowRight, FileText, User, MapPin, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { TypeWriter } from './TypeWriter';
import { FloatingObjects } from './FloatingObjects';

interface HeroSectionProps {
  onOpenResume: () => void;
}

const TYPEWRITER_ROLES = [
  'Admin & Operations Professional',
  'Detail-Oriented Encoder',
  'Microsoft Office Specialist',
  'Customer Service Expert',
  'Organized & Adaptable Worker',
];

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="objective"
      className="relative overflow-hidden bg-gradient-to-br from-[#FCFAFA] via-[#FDF6F8] to-[#F9EFF3] text-[#18181B] border-b border-[#EAE3E6]"
    >
      {/* Animated canvas background */}
      <FloatingObjects />

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(190,42,82,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(190,42,82,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-16 md:pt-20 md:pb-22">
        {/* Top badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BE2A52]/25 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-[#BE2A52] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Available for Opportunities · Cainta, Rizal, Philippines
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Name heading */}
            <div className="space-y-3">
              <p className="font-mono text-xs sm:text-sm font-medium text-[#71717A] tracking-widest uppercase">
                Portfolio · Administrative &amp; Operations
              </p>
              <h1
                className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-[#18181B]"
                style={{ textWrap: 'balance' }}
              >
                Elaine L.{' '}
                <span className="relative inline-block font-serif italic font-medium text-[#BE2A52]">
                  Pacia
                  {/* Underline accent */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full bg-gradient-to-r from-[#BE2A52] to-[#E8637F] opacity-60"
                  />
                </span>
              </h1>

              {/* Typewriter role */}
              <div className="h-8 sm:h-9 flex items-center">
                {shouldReduceMotion ? (
                  <span className="font-serif italic text-xl sm:text-2xl text-[#52525B]">
                    {TYPEWRITER_ROLES[0]}
                  </span>
                ) : (
                  <TypeWriter
                    texts={TYPEWRITER_ROLES}
                    typingSpeed={70}
                    deletingSpeed={40}
                    pauseDuration={2200}
                    className="font-serif italic text-xl sm:text-2xl text-[#52525B]"
                    cursorClassName="bg-[#BE2A52]"
                  />
                )}
              </div>
            </div>

            {/* Career Objective card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl border border-[#EAE3E6] bg-white/90 backdrop-blur-sm p-6 sm:p-7 shadow-sm"
            >
              {/* Rose accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full bg-gradient-to-b from-[#BE2A52] to-[#E8637F]"
              />
              <p className="font-mono text-xs font-semibold text-[#BE2A52] mb-2 uppercase tracking-widest">
                Career Objective
              </p>
              <blockquote className="text-base sm:text-lg leading-relaxed text-[#18181B]">
                "{PORTFOLIO_PROFILE.objective}."
              </blockquote>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={scrollToContact}
                className="group inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#BE2A52] to-[#D94070] px-7 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#BE2A52]/25 transition-all duration-200 hover:shadow-lg hover:shadow-[#BE2A52]/35 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#DDD4D8] bg-white/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-[#18181B] shadow-sm transition-all duration-200 hover:border-[#BE2A52] hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-[#BE2A52]" aria-hidden="true" />
                <span>View Printable CV</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Portrait */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none">
              {/* Decorative ring behind portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-t-[180px] rounded-b-2xl border-2 border-[#BE2A52]/15 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-t-[200px] rounded-b-3xl border border-[#BE2A52]/08 pointer-events-none"
              />

              {/* Portrait card */}
              <div className="flex flex-col rounded-t-[160px] rounded-b-2xl border border-[#EAE3E6] bg-white/90 backdrop-blur-sm p-3.5 sm:p-4 shadow-xl shadow-[#BE2A52]/08">
                <div className="relative aspect-square lg:aspect-auto lg:h-full lg:min-h-[380px] w-full overflow-hidden rounded-t-[150px] rounded-b-xl bg-gradient-to-b from-[#F6F1F3] to-[#EDE0E6]">
                  {!imageError ? (
                    <img
                      src={PORTFOLIO_PROFILE.portraitPath}
                      alt="Formal portrait of Elaine L. Pacia"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <User className="h-14 w-14 text-[#BE2A52]/40 mb-3" aria-hidden="true" />
                      <p className="font-serif text-xl font-medium text-[#18181B]">
                        {PORTFOLIO_PROFILE.fullName}
                      </p>
                    </div>
                  )}

                  {/* Gradient overlay at bottom */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none"
                  />
                </div>

                {/* Name + location caption */}
                <div className="mt-3 flex items-center justify-between px-1.5">
                  <span className="font-mono text-[11px] text-[#71717A]">
                    {PORTFOLIO_PROFILE.fullName}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#71717A]">
                    <MapPin className="h-3 w-3 text-[#BE2A52]" aria-hidden="true" />
                    Cainta, Rizal
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Stats strip */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-[#EAE3E6] bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
        >
          {PORTFOLIO_PROFILE.summaryFacts.map((item, idx) => (
            <div
              key={item.label}
              className={`group px-5 py-5 sm:px-6 sm:py-6 transition-colors duration-150 hover:bg-[#FDF4F6] ${
                idx % 2 === 1 ? 'border-l border-[#EAE3E6]' : ''
              } ${idx >= 2 ? 'border-t lg:border-t-0 lg:border-l border-[#EAE3E6]' : ''}`}
            >
              <p className="font-mono text-[11px] text-[#71717A] tabular-nums">
                0{idx + 1} · {item.label}
              </p>
              <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#18181B] group-hover:text-[#BE2A52] transition-colors duration-150">
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
