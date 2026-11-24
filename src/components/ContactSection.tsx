import { useState, type FormEvent } from 'react';
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

type CopyField = 'phone' | 'email' | 'address' | 'message' | null;

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<CopyField>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'ready'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopy = async (field: Exclude<CopyField, null>, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2200);
    } catch {
      setCopiedField(null);
    }
  };

  const formattedInquiry = `Hello Elaine,\n\nMy name is ${senderName.trim() || '[Your Name]'}${
    organization.trim() ? ` from ${organization.trim()}` : ''
  }.\n\n${message.trim()}\n\nReply to: ${senderEmail.trim() || '[Your Email]'}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim());
    if (!emailValid) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setFormStatus('ready');

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName.trim()}${
        organization.trim() ? ` (${organization.trim()})` : ''
      }`
    );
    const body = encodeURIComponent(formattedInquiry);
    window.location.href = `mailto:${PORTFOLIO_PROFILE.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="bg-[#FAF6F7] text-[#18181B]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2.5">
              <p className="font-mono text-xs font-medium text-[#BE2A52]">
                04 · Direct Contact
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B]"
                style={{ textWrap: 'balance' }}
              >
                Let’s{' '}
                <span className="font-serif italic font-medium text-[#BE2A52]">
                  Connect
                </span>
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#52525B]">
                Open to administrative support, data encoding, and operations opportunities in Cainta, Rizal and nearby Metro Manila areas.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAE3E6] bg-white divide-y divide-[#F0E9EC]">
              {/* Phone */}
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="text-xs text-[#71717A] flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#BE2A52]" aria-hidden="true" />
                    <span>Mobile Phone</span>
                  </p>
                  <a
                    href={`tel:${PORTFOLIO_PROFILE.contact.phone}`}
                    className="mt-1 block font-mono text-sm sm:text-base font-medium tabular-nums text-[#18181B] hover:text-[#BE2A52] transition-colors"
                  >
                    {PORTFOLIO_PROFILE.contact.phone}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('phone', PORTFOLIO_PROFILE.contact.phone)}
                  aria-label="Copy phone number"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#EAE3E6] bg-[#FCFAFA] px-3 py-1.5 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52] shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#71717A]" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="text-xs text-[#71717A] flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#BE2A52]" aria-hidden="true" />
                    <span>Email Address</span>
                  </p>
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.contact.email}`}
                    className="mt-1 block truncate text-sm sm:text-base font-medium text-[#18181B] hover:text-[#BE2A52] transition-colors"
                  >
                    {PORTFOLIO_PROFILE.contact.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('email', PORTFOLIO_PROFILE.contact.email)}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#EAE3E6] bg-[#FCFAFA] px-3 py-1.5 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52] shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#71717A]" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="text-xs text-[#71717A] flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#BE2A52]" aria-hidden="true" />
                    <span>Address</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#18181B]">
                    {PORTFOLIO_PROFILE.contact.address}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('address', PORTFOLIO_PROFILE.contact.address)}
                  aria-label="Copy home address"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#EAE3E6] bg-[#FCFAFA] px-3 py-1.5 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52] shrink-0 cursor-pointer"
                >
                  {copiedField === 'address' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#71717A]" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Light Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[#EAE3E6] bg-white p-6 sm:p-8 space-y-5"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#18181B]">
                  Send an Inquiry
                </h3>
                <p className="mt-1 text-sm text-[#52525B]">
                  Compose a message directly to{' '}
                  <span className="font-medium text-[#18181B]">
                    {PORTFOLIO_PROFILE.contact.email}
                  </span>
                  .
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sender-name"
                    className="block text-xs font-medium text-[#3F3F46] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      if (formStatus === 'error') setFormStatus('idle');
                    }}
                    placeholder="e.g. Maria Santos"
                    className="w-full min-h-[44px] rounded-lg border border-[#DED6D9] bg-[#FCFAFA] px-3.5 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#BE2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE2A52]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sender-email"
                    className="block text-xs font-medium text-[#3F3F46] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      if (formStatus === 'error') setFormStatus('idle');
                    }}
                    placeholder="name@company.com"
                    className="w-full min-h-[44px] rounded-lg border border-[#DED6D9] bg-[#FCFAFA] px-3.5 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#BE2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE2A52]/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sender-org"
                  className="block text-xs font-medium text-[#3F3F46] mb-1.5"
                >
                  Company or Organization (Optional)
                </label>
                <input
                  id="sender-org"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Metro Business Group"
                  className="w-full min-h-[44px] rounded-lg border border-[#DED6D9] bg-[#FCFAFA] px-3.5 py-2 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#BE2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE2A52]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium text-[#3F3F46] mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="inquiry-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (formStatus === 'error') setFormStatus('idle');
                  }}
                  placeholder="Share role details, interview schedule, or questions..."
                  className="w-full rounded-lg border border-[#DED6D9] bg-[#FCFAFA] px-3.5 py-2.5 text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#BE2A52] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BE2A52]/20 resize-y"
                />
              </div>

              {formStatus === 'error' && (
                <p role="alert" className="text-xs font-medium text-[#BE2A52]">
                  {errorMessage}
                </p>
              )}

              {formStatus === 'ready' && (
                <div
                  role="status"
                  className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <span>
                    Email client prompted. You can also copy the message below.
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('message', formattedInquiry)}
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-900 underline underline-offset-2 shrink-0 cursor-pointer"
                  >
                    {copiedField === 'message' ? 'Copied Message' : 'Copy Message'}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#BE2A52] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#9E1F42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE2A52] focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Send via Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy('message', formattedInquiry)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-[#EAE3E6] bg-[#FCFAFA] px-4 py-2 text-xs font-medium text-[#18181B] transition-colors hover:border-[#BE2A52] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'message' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Draft Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#71717A]" aria-hidden="true" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
