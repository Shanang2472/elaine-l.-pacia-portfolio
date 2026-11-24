import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { AudioPlayer } from './components/AudioPlayer';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { Navbar } from './components/Navbar';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { NAV_LINKS } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('objective');
  const [resumeOpen, setResumeOpen] = useState(false);

  // Smooth scroll progress bar across the entire page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAFA] text-[#18181B] relative selection:bg-[#BE2A52]/15 selection:text-[#BE2A52]">
      {/* 🚀 Sleek Scroll Progress Bar at the Top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#BE2A52] via-[#E8637F] to-[#FF8FAB] origin-left z-50 pointer-events-none"
      />

      <Navbar
        activeSection={activeSection}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main className="no-print flex-1">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <MarqueeRibbon />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />

      <AudioPlayer />

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
