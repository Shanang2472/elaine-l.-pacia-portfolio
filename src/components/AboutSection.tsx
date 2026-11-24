import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, GraduationCap, Heart } from 'lucide-react';

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const highlights = [
    {
      icon: GraduationCap,
      label: 'Undergraduate Student',
      detail: 'Bachelor of Science in Information Systems (BSIS)',
    },
    {
      icon: Heart,
      label: 'Dedicated Mother',
      detail: 'A strong and loving mother balancing family and academics',
    },
    {
      icon: Sparkles,
      label: 'Goal-Driven',
      detail: 'Committed to growth, learning, and making a difference',
    },
  ];

  return (
    <section id="about" className="bg-[#FCFAFA] border-b border-[#EAE3E6] overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 md:py-24">
        {/* Section Label */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs font-semibold text-[#BE2A52] mb-4 tracking-widest uppercase flex items-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5" />
          About Me
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Intro Text with Staggered Scroll Reveal */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <h2
              className="text-[clamp(1.9rem,4vw,2.85rem)] font-bold leading-tight tracking-tight text-[#18181B]"
              style={{ textWrap: 'balance' }}
            >
              Hi, I'm{' '}
              <span className="font-serif italic font-medium text-[#BE2A52]">
                Elaine
              </span>{' '}
              — and this is my story.
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#3F3F46]">
              <p>
                I am <strong className="text-[#18181B]">Elaine L. Pacia</strong>, an undergraduate
                student currently pursuing a{' '}
                <strong className="text-[#18181B]">
                  Bachelor of Science in Information Systems (BSIS)
                </strong>{' '}
                — a course I chose not just for its career opportunities, but because it fuels my
                genuine curiosity about how technology can solve real-world problems.
              </p>

              <p>
                Beyond the classroom, I wear another title I hold with great pride: a{' '}
                <strong className="text-[#18181B]">mother</strong>. Being a mom while pursuing a
                degree is no small feat, but it has made me stronger, more disciplined, and more
                intentional about every step I take. My child is my greatest motivation — proof
                that every late-night study session and every challenge I push through is worth it.
              </p>

              <p>
                I am a firm believer that dedication, resilience, and heart can carry you far. I
                bring these values not only to my studies, but to every professional role I step
                into. Whether it's managing administrative tasks, learning new tools, or working
                within a team, I show up — fully and consistently.
              </p>

              <p>
                I am not just building a career. I am building a future — for myself, and for the
                family who inspires me every single day.
              </p>
            </div>
          </motion.div>

          {/* Right: Highlight Cards with Slide In and Elevation */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                        borderColor: '#BE2A52',
                        boxShadow: '0 8px 20px -6px rgba(190,42,82,0.1)',
                      }
                }
                className="flex items-start gap-4 rounded-xl border border-[#EAE3E6] bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 cursor-default"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#BE2A52]/10 text-[#BE2A52]">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-sm sm:text-base text-[#18181B]">{item.label}</p>
                  <p className="mt-0.5 text-sm text-[#52525B] leading-snug">{item.detail}</p>
                </div>
              </motion.div>
            ))}

            {/* Quote Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-[#BE2A52]/25 bg-gradient-to-br from-[#BE2A52]/5 to-[#BE2A52]/10 p-5 sm:p-6 shadow-xs relative overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute -right-4 -bottom-4 text-7xl font-serif text-[#BE2A52]/10 select-none pointer-events-none"
              >
                ”
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#8E1B3B] leading-relaxed relative z-10">
                "Being a student and a mother at the same time taught me that strength isn't the
                absence of struggle — it's choosing to keep going despite it."
              </p>
              <p className="mt-3 font-mono text-xs font-semibold text-[#BE2A52] relative z-10">— Elaine L. Pacia</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
