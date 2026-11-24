import { useEffect } from 'react';
import { Printer, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  CAPABILITIES_LIST,
  EDUCATION_LIST,
  EXPERIENCE_LIST,
  PORTFOLIO_PROFILE,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Printable Curriculum Vitae"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            onClick={onClose}
            className="no-print absolute inset-0 bg-[#18181B]/55 backdrop-blur-xs"
          />

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="print-only-cv relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#EAE3E6] bg-white shadow-2xl"
          >
            {/* Modal Action Bar */}
            <div className="no-print flex items-center justify-between border-b border-[#EAE3E6] bg-[#FAF6F7] text-[#18181B] px-5 py-3.5 sm:px-7">
              <p className="text-xs sm:text-sm font-medium text-[#52525B]">
                Curriculum Vitae · {PORTFOLIO_PROFILE.fullName}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#BE2A52] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#9E1F42] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#EAE3E6] bg-white text-[#18181B] transition-colors hover:border-[#BE2A52] cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Printable Formal CV Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-7 text-[#141215]">
              {/* CV Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-[#DCD4CC] pb-6">
                <img
                  src={PORTFOLIO_PROFILE.portraitPath}
                  alt="Elaine L. Pacia formal headshot"
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 rounded-t-full rounded-b-md object-cover object-top border border-[#DCD4CC] shrink-0"
                />
                <div className="space-y-1.5">
                  <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#141215]">
                    {PORTFOLIO_PROFILE.fullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#524C54]">
                    <span className="font-mono tabular-nums">{PORTFOLIO_PROFILE.contact.phone}</span>
                    <span aria-hidden="true" className="mx-2">·</span>
                    <span>{PORTFOLIO_PROFILE.contact.email}</span>
                  </p>
                  <p className="text-xs text-[#7A737C]">
                    {PORTFOLIO_PROFILE.contact.address}
                  </p>
                </div>
              </div>

              {/* Objective */}
              <div>
                <h3 className="font-mono text-xs font-semibold text-[#BE2A52] mb-1.5">
                  Objective
                </h3>
                <p className="text-sm leading-relaxed text-[#27272A]">
                  {PORTFOLIO_PROFILE.objective}.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-mono text-xs font-semibold text-[#BE2A52] mb-3">
                  Experience
                </h3>
                <div className="space-y-4">
                  {EXPERIENCE_LIST.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                      <div className="sm:col-span-3 font-mono text-xs tabular-nums text-[#7A737C]">
                        {exp.period} ({exp.duration})
                      </div>
                      <div className="sm:col-span-9">
                        <p className="text-sm font-semibold text-[#141215]">
                          {exp.organization} — {exp.role}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#524C54]">
                          {exp.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-mono text-xs font-semibold text-[#BE2A52] mb-3">
                  Education
                </h3>
                <div className="space-y-2.5">
                  {EDUCATION_LIST.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                      <div className="sm:col-span-3 font-mono text-xs tabular-nums text-[#7A737C]">
                        {edu.period}
                      </div>
                      <div className="sm:col-span-9">
                        <p className="text-sm font-medium text-[#141215]">{edu.institution}</p>
                        <p className="text-xs text-[#7A737C]">{edu.level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#DCD4CC] pt-5">
                <div>
                  <h3 className="font-mono text-xs font-semibold text-[#BE2A52] mb-2">
                    Skills
                  </h3>
                  <ul className="space-y-1 text-xs text-[#3F3F46]">
                    {CAPABILITIES_LIST.filter((c) => c.category !== 'languages').map((skill) => (
                      <li key={skill.id}>• {skill.resumeLabel}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs font-semibold text-[#BE2A52] mb-2">
                    Languages
                  </h3>
                  <ul className="space-y-1 text-xs text-[#3F3F46]">
                    {PORTFOLIO_PROFILE.languages.map((lang) => (
                      <li key={lang.name}>
                        • {lang.name} ({lang.proficiency})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
