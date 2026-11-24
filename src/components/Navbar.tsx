import { useEffect, useState } from 'react';
import { ArrowUpRight, FileText, Mail, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { NAV_LINKS, PORTFOLIO_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
}

const NAV_DESCRIPTIONS: Record<string, string> = {
  objective: 'Career direction & introduction',
  experience: 'Work history & responsibilities',
  education: 'Academic background timeline',
  skills: 'Core competencies & languages',
  contact: 'Direct contact & inquiry form',
};

export function Navbar({ activeSection, onOpenResume }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <>
      <header className="no-print sticky top-0 z-40 w-full border-b border-[#EAE3E6] bg-white/95 backdrop-blur-md text-[#18181B]">
        <div className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
          {/* Zone 1: Single-line Wordmark */}
          <a
            href="#objective"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#objective');
            }}
            className="font-serif text-xl font-semibold tracking-tight text-[#18181B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] rounded-sm"
          >
            {PORTFOLIO_PROFILE.brandName}
          </a>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] rounded-sm ${
                    isActive ? 'text-[#18181B]' : 'text-[#52525B] hover:text-[#18181B]'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#BE2A52] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-lg bg-[#BE2A52] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#9E1F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>View Resume</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-light-menu"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E6DFE2] bg-[#FCFAFA] text-[#18181B] transition-colors hover:border-[#BE2A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Clean Light-Theme Modern Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            id="mobile-light-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="no-print fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-[#18181B]/25 backdrop-blur-xs"
            />

            {/* Light Slide-Over Drawer */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 flex w-full max-w-sm flex-col justify-between bg-white border-l border-[#EAE3E6] shadow-2xl"
            >
              <div>
                <div className="flex h-14 items-center justify-between border-b border-[#EAE3E6] px-5">
                  <span className="font-serif text-lg font-semibold text-[#18181B]">
                    {PORTFOLIO_PROFILE.brandName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E6DFE2] bg-[#FCFAFA] text-[#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] cursor-pointer"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Mobile Sections" className="px-5 py-6">
                  <p className="font-mono text-xs text-[#71717A] mb-3">
                    Navigation
                  </p>
                  <ul className="divide-y divide-[#F0E9EC] border-y border-[#F0E9EC]">
                    {NAV_LINKS.map((link, idx) => {
                      const isActive = activeSection === link.id;
                      return (
                        <li key={link.id}>
                          <a
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(link.href);
                            }}
                            className={`flex min-h-[58px] items-center justify-between py-3 transition-colors ${
                              isActive
                                ? 'text-[#BE2A52]'
                                : 'text-[#18181B] hover:text-[#BE2A52]'
                            }`}
                          >
                            <div className="flex items-baseline gap-3.5">
                              <span className="font-mono text-xs tabular-nums text-[#71717A]">
                                0{idx + 1}
                              </span>
                              <div>
                                <span className="block text-base font-semibold">
                                  {link.label}
                                </span>
                                <span className="block text-xs text-[#71717A]">
                                  {NAV_DESCRIPTIONS[link.id]}
                                </span>
                              </div>
                            </div>
                            <ArrowUpRight
                              className={`h-4 w-4 shrink-0 ${
                                isActive ? 'text-[#BE2A52]' : 'text-[#A1A1AA]'
                              }`}
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="border-t border-[#EAE3E6] bg-[#FAF6F7] p-5 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenResume();
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#BE2A52] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9E1F42] cursor-pointer"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>View Printable Resume</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${PORTFOLIO_PROFILE.contact.phone}`}
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#E6DFE2] bg-white px-3 py-2 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#BE2A52]" aria-hidden="true" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.contact.email}`}
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#E6DFE2] bg-white px-3 py-2 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52]"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#BE2A52]" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
