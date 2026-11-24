import { EDUCATION_LIST } from '../data/portfolioData';

export function EducationSection() {
  return (
    <section
      id="education"
      className="mx-auto max-w-6xl px-5 sm:px-8 py-14 md:py-20 border-b border-[#EAE3E6]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="space-y-2">
          <p className="font-mono text-xs font-medium text-[#BE2A52]">
            02 · Academic Background
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B]"
            style={{ textWrap: 'balance' }}
          >
            Education{' '}
            <span className="font-serif italic font-medium text-[#BE2A52]">
              Timeline
            </span>
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#52525B]">
          Academic progression completed in Cainta, Rizal across college, senior high, junior high, and elementary levels.
        </p>
      </div>

      {/* Organized Light Ledger Table */}
      <div className="rounded-2xl border border-[#EAE3E6] bg-white divide-y divide-[#EAE3E6] overflow-hidden">
        {EDUCATION_LIST.map((edu, idx) => (
          <div
            key={edu.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 px-6 py-5 sm:px-8 sm:py-6 items-baseline transition-colors duration-150 hover:bg-[#FAF6F7]"
          >
            <div className="md:col-span-3 flex items-baseline gap-3">
              <span className="font-mono text-xs tabular-nums text-[#A1A1AA]">
                0{idx + 1}
              </span>
              <span className="font-serif italic text-xl sm:text-2xl font-medium tabular-nums text-[#BE2A52]">
                {edu.period}
              </span>
            </div>

            <div className="md:col-span-6">
              <h3 className="text-base sm:text-lg font-semibold text-[#18181B] leading-snug">
                {edu.institution}
              </h3>
            </div>

            <div className="md:col-span-3 md:text-right">
              <p className="text-xs sm:text-sm text-[#71717A]">
                <span>{edu.level}</span>
                <span aria-hidden="true" className="mx-1.5 text-[#BE2A52]">·</span>
                <span>{edu.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
