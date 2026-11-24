import { motion } from 'motion/react';

const RIBBON_ITEMS = [
  'Administrative Support',
  'Data Encoding',
  'Microsoft Office Suite',
  'Customer Operations',
  'Organization & Detail',
  'Time Management',
  'English & Filipino',
];

export function MarqueeRibbon() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
      className="no-print w-full overflow-hidden border-b border-[#EAE3E6] bg-[#F7F2F4] py-3.5 select-none"
    >
      <div className="animate-marquee flex items-center">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {RIBBON_ITEMS.map((item, idx) => (
              <span
                key={`${dup}-${idx}`}
                className="flex items-center text-xs sm:text-sm text-[#52525B] whitespace-nowrap"
              >
                <span
                  className={`px-4 sm:px-6 ${
                    idx % 2 === 1
                      ? 'font-serif italic text-base text-[#18181B]'
                      : 'font-medium'
                  }`}
                >
                  {item}
                </span>
                <span className="text-[#BE2A52]">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
