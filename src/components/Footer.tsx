import { ArrowUp } from 'lucide-react';
import { NAV_LINKS, PORTFOLIO_PROFILE } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="no-print border-t border-[#EAE3E6] bg-white text-[#52525B]">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-5 sm:px-8 py-8">
        <div>
          <p className="font-serif text-lg font-semibold text-[#18181B]">
            {PORTFOLIO_PROFILE.fullName}
          </p>
          <p className="mt-1 text-xs text-[#71717A]">
            {PORTFOLIO_PROFILE.contact.shortLocation} · {PORTFOLIO_PROFILE.contact.email}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-[#52525B] hover:text-[#BE2A52] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#EAE3E6] bg-[#FCFAFA] px-3 py-1.5 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52] cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
