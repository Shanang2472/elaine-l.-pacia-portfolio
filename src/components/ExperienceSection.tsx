import { useState } from 'react';
import { ArrowRight, Check, Briefcase } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EXPERIENCE_LIST } from '../data/portfolioData';

export function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCE_LIST[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeRole =
    EXPERIENCE_LIST.find((item) => item.id === selectedId) ?? EXPERIENCE_LIST[0];

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-5 sm:px-8 py-16 md:py-24 border-b border-[#EAE3E6] overflow-hidden"
    >
      {/* Organized Section Header with Scroll Transition */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
      >
        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold text-[#BE2A52] tracking-widest uppercase flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            01 · Work Experience
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B]"
            style={{ textWrap: 'balance' }}
          >
            Professional{' '}
            <span className="font-serif italic font-medium text-[#BE2A52]">
              Experience
            </span>
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#52525B]">
          Select a role on the left to view key responsibilities, workplace tools, and core strengths.
        </p>
      </motion.div>

      {/* Light Master-Detail Split Layout with Scroll Reveal */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-[#EAE3E6] bg-white overflow-hidden shadow-sm"
      >
        {/* Left Role Selector Index */}
        <div
          role="tablist"
          aria-label="Work experience roles"
          className="lg:col-span-5 divide-y divide-[#EAE3E6] border-b lg:border-b-0 lg:border-r border-[#EAE3E6] flex flex-col"
        >
          {EXPERIENCE_LIST.map((item, idx) => {
            const isSelected = item.id === activeRole.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedId(item.id)}
                className={`group flex-1 text-left p-6 sm:p-7 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#BE2A52] ${
                  isSelected
                    ? 'bg-[#FDF4F6]'
                    : 'bg-white hover:bg-[#FAF6F7]'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-xs font-mono tabular-nums">
                  <span className={isSelected ? 'text-[#BE2A52] font-semibold' : 'text-[#71717A]'}>
                    0{idx + 1} · {item.period}
                  </span>
                  <span className="text-[#71717A]">{item.duration}</span>
                </div>

                <h3 className="mt-3 font-serif text-2xl font-semibold text-[#18181B] leading-snug group-hover:text-[#BE2A52] transition-colors">
                  {item.organization}
                </h3>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#52525B]">
                    {item.role}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold transition-transform duration-200 ${
                      isSelected
                        ? 'text-[#BE2A52]'
                        : 'text-[#71717A] group-hover:text-[#18181B] group-hover:translate-x-1'
                    }`}
                  >
                    <span>{isSelected ? 'Selected' : 'View'}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-9 flex flex-col justify-between min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="border-b border-[#F0E9EC] pb-5">
                <p className="font-mono text-xs font-medium text-[#BE2A52] tabular-nums">
                  {activeRole.period} · {activeRole.duration}
                </p>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
                  {activeRole.role}
                </h3>
                <p className="mt-1 font-serif italic text-lg text-[#52525B]">
                  {activeRole.organization} · {activeRole.location}
                </p>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#52525B]">
                {activeRole.summary}
              </p>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#18181B] uppercase tracking-wider">
                  Key Responsibilities &amp; Contributions
                </p>
                <ul className="space-y-2.5">
                  {activeRole.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-[#3F3F46] leading-relaxed"
                    >
                      <Check
                        className="h-4 w-4 text-[#BE2A52] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-4 border-t border-[#F0E9EC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-[#71717A]">
              {activeRole.competencies.join(' · ')}
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex min-h-[38px] items-center gap-1.5 text-xs font-semibold text-[#BE2A52] hover:text-[#9E1F42] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Inquire about this role</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
