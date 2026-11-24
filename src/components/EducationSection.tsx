import { EDUCATION_LIST } from '../data/portfolioData';
import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap, MapPin } from 'lucide-react';

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="mx-auto max-w-6xl px-5 sm:px-8 py-16 md:py-24 border-b border-[#EAE3E6] overflow-hidden"
    >
      {/* Header with Scroll Animation */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
      >
        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold text-[#BE2A52] tracking-widest uppercase flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
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
          Academic progression completed in Cainta, Rizal across tertiary, senior high, junior high, and elementary levels.
        </p>
      </motion.div>

      {/* Organized Light Ledger Table with Staggered Scroll Animation */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-[#EAE3E6] bg-white divide-y divide-[#EAE3E6] shadow-sm overflow-hidden"
      >
        {EDUCATION_LIST.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: idx * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={shouldReduceMotion ? undefined : { x: 6, backgroundColor: '#FAF4F6' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 px-6 py-5 sm:px-8 sm:py-6 items-baseline transition-colors duration-200 cursor-default"
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
              <p className="text-xs sm:text-sm text-[#71717A] flex items-center md:justify-end gap-1.5">
                <span>{edu.level}</span>
                <span aria-hidden="true" className="text-[#BE2A52]">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#A1A1AA]" />
                  {edu.location}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
