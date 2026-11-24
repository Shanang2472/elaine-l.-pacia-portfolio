import { useMemo, useState } from 'react';
import { CAPABILITIES_LIST, PORTFOLIO_PROFILE, type SkillCategory } from '../data/portfolioData';
import { motion, useReducedMotion } from 'motion/react';
import { Award, Globe2 } from 'lucide-react';

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'administrative', label: 'Administrative & Tools' },
  { id: 'strengths', label: 'Personal Strengths' },
  { id: 'languages', label: 'Languages' },
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredCapabilities = useMemo(() => {
    if (activeFilter === 'all') {
      return CAPABILITIES_LIST;
    }
    return CAPABILITIES_LIST.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl px-5 sm:px-8 py-16 md:py-24 border-b border-[#EAE3E6] overflow-hidden"
    >
      {/* Header & Tab with Scroll Reveal */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
      >
        <div className="space-y-2 max-w-xl">
          <p className="font-mono text-xs font-semibold text-[#BE2A52] tracking-widest uppercase flex items-center gap-2">
            <Award className="h-4 w-4" />
            03 · Core Strengths
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B]"
            style={{ textWrap: 'balance' }}
          >
            Skills &amp;{' '}
            <span className="font-serif italic font-medium text-[#BE2A52]">
              Languages
            </span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#52525B]">
            Organized workplace competencies spanning Microsoft Office tools, detail accuracy, and bilingual communication.
          </p>
        </div>

        {/* Clean Light Segmented Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter capabilities by category"
          className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#EAE3E6] bg-[#F7F2F4] p-1 self-start lg:self-auto shadow-xs"
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(tab.id)}
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] ${
                  isSelected
                    ? 'bg-white text-[#BE2A52] font-semibold shadow-xs'
                    : 'text-[#52525B] hover:text-[#18181B]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Uniform, Staggered Animated Grid with Hover Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCapabilities.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.45,
              delay: idx * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -6,
                    borderColor: '#BE2A52',
                    boxShadow: '0 12px 28px -8px rgba(190,42,82,0.12)',
                  }
            }
            className="flex flex-col justify-between rounded-2xl border border-[#EAE3E6] bg-white p-6 transition-all duration-200 shadow-xs group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-serif italic text-2xl leading-none tabular-nums text-[#BE2A52] group-hover:scale-110 transition-transform origin-left">
                  {item.index}
                </span>
                <span className="font-mono text-[11px] text-[#71717A] bg-[#FAF4F6] px-2 py-0.5 rounded-full border border-[#EAE3E6]">
                  {item.categoryLabel}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-[#18181B] group-hover:text-[#BE2A52] transition-colors">
                {item.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-3.5 border-t border-[#F2ECEE] text-xs text-[#71717A] flex items-center justify-between">
              <span>Resume focus · {item.resumeLabel}</span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Organized Bilingual Fluency Bar with Scroll Animation */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 rounded-2xl border border-[#EAE3E6] bg-white px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs"
      >
        <div>
          <p className="font-mono text-xs font-semibold text-[#BE2A52] tracking-wider uppercase flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            Languages Spoken
          </p>
          <p className="mt-0.5 text-sm text-[#52525B]">
            Ready for clear written and spoken communication across diverse teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          {PORTFOLIO_PROFILE.languages.map((lang) => (
            <div key={lang.name} className="flex flex-col">
              <p className="text-base font-semibold text-[#18181B]">{lang.name}</p>
              <p className="text-xs text-[#71717A]">{lang.proficiency}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
