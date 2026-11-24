import { useMemo, useState } from 'react';
import { CAPABILITIES_LIST, PORTFOLIO_PROFILE, type SkillCategory } from '../data/portfolioData';

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Capabilities' },
  { id: 'administrative', label: 'Administrative & Tools' },
  { id: 'strengths', label: 'Personal Strengths' },
  { id: 'languages', label: 'Languages' },
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');

  const filteredCapabilities = useMemo(() => {
    if (activeFilter === 'all') {
      return CAPABILITIES_LIST;
    }
    return CAPABILITIES_LIST.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl px-5 sm:px-8 py-14 md:py-20 border-b border-[#EAE3E6]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-xl">
          <p className="font-mono text-xs font-medium text-[#BE2A52]">
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
          className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#EAE3E6] bg-[#F7F2F4] p-1 self-start lg:self-auto"
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
                className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] ${
                  isSelected
                    ? 'bg-white text-[#18181B] shadow-xs'
                    : 'text-[#52525B] hover:text-[#18181B]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Uniform, Organized Light Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCapabilities.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-[#EAE3E6] bg-white p-6 transition-colors duration-150 hover:border-[#D4C6CC]"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-serif italic text-2xl leading-none tabular-nums text-[#BE2A52]">
                  {item.index}
                </span>
                <span className="font-mono text-[11px] text-[#71717A]">
                  {item.categoryLabel}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-[#18181B]">
                {item.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-3.5 border-t border-[#F2ECEE] text-xs text-[#71717A]">
              <span>Resume focus · {item.resumeLabel}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Organized Bilingual Fluency Bar */}
      <div className="mt-6 rounded-2xl border border-[#EAE3E6] bg-white px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-medium text-[#BE2A52]">
            Languages Spoken
          </p>
          <p className="mt-0.5 text-sm text-[#52525B]">
            Ready for clear written and spoken communication across diverse teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          {PORTFOLIO_PROFILE.languages.map((lang) => (
            <div key={lang.name}>
              <p className="text-base font-semibold text-[#18181B]">{lang.name}</p>
              <p className="text-xs text-[#71717A]">{lang.proficiency}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
