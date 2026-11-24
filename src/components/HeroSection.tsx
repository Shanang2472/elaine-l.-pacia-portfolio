import { useState } from 'react';
import { ArrowRight, FileText, User } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

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
      className="bg-[#FCFAFA] text-[#18181B] border-b border-[#EAE3E6]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-12 md:pt-14 md:pb-16">
        {/* Clean 12-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Introduction & Career Objective */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between py-1"
          >
            <div className="space-y-6">
              <p className="text-xs sm:text-sm font-medium text-[#52525B]">
                <span>{PORTFOLIO_PROFILE.contact.shortLocation}</span>
                <span aria-hidden="true" className="mx-2 text-[#BE2A52]">·</span>
                <span>Administrative &amp; Operations Portfolio</span>
              </p>

              <div className="space-y-2.5">
                <h1
                  className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.04] tracking-tight text-[#18181B]"
                  style={{ textWrap: 'balance' }}
                >
                  Elaine L.{' '}
                  <span className="font-serif italic font-medium text-[#BE2A52]">
                    Pacia
                  </span>
                </h1>

                <p
                  className="font-serif italic text-xl sm:text-2xl text-[#52525B] leading-snug max-w-xl"
                  style={{ textWrap: 'balance' }}
                >
                  {PORTFOLIO_PROFILE.headline}
                </p>
              </div>

              {/* Clean Light Career Objective Box */}
              <div className="rounded-xl border border-[#EAE3E6] bg-white p-6 sm:p-7">
                <p className="font-mono text-xs font-medium text-[#BE2A52] mb-2">
                  Career Objective
                </p>
                <blockquote className="text-base sm:text-lg leading-relaxed text-[#18181B]">
                  “{PORTFOLIO_PROFILE.objective}.”
                </blockquote>
              </div>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#BE2A52] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#9E1F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#DDD4D8] bg-white px-5 py-2.5 text-sm font-medium text-[#18181B] transition-colors duration-150 hover:border-[#BE2A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-[#BE2A52]" aria-hidden="true" />
                <span>View Printable CV</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Bright Arch-Framed Formal Portrait */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="flex w-full flex-col justify-between rounded-t-[170px] rounded-b-xl border border-[#EAE3E6] bg-white p-3.5 sm:p-4">
              <div className="relative aspect-square lg:aspect-auto lg:h-full lg:min-h-[370px] w-full overflow-hidden rounded-t-[158px] rounded-b-lg bg-[#F6F1F3]">
                {!imageError ? (
                  <img
                    src={PORTFOLIO_PROFILE.portraitPath}
                    alt="Formal portrait of Elaine L. Pacia in black blazer and white collared blouse"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <User className="h-12 w-12 text-[#A1A1AA] mb-3" aria-hidden="true" />
                    <p className="font-serif text-xl font-medium text-[#18181B]">
                      {PORTFOLIO_PROFILE.fullName}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between px-1.5 font-mono text-[11px] text-[#71717A]">
                <span>{PORTFOLIO_PROFILE.fullName}</span>
                <span>Cainta, Rizal</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Organized Summary Strip */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 rounded-xl border border-[#EAE3E6] bg-white overflow-hidden">
          {PORTFOLIO_PROFILE.summaryFacts.map((item, idx) => (
            <div
              key={item.label}
              className={`px-5 py-4 sm:px-6 sm:py-5 ${
                idx % 2 === 1 ? 'border-l border-[#EAE3E6]' : ''
              } ${idx >= 2 ? 'border-t lg:border-t-0 lg:border-l border-[#EAE3E6]' : ''}`}
            >
              <p className="font-mono text-[11px] text-[#71717A] tabular-nums">
                0{idx + 1} · {item.label}
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-[#18181B]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
