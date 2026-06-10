import Navbar from '@/components/ui/Navbar'
import ScrollProgress from '@/components/ui/ScrollProgress'
import IntroVideo from '@/components/ui/IntroVideo'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import WorkExperienceSection from '@/components/sections/WorkExperienceSection'
import PublicationsSection from '@/components/sections/PublicationsSection'
import ContactSection from '@/components/sections/ContactSection'

/**
 * Single Page Application — one continuous, scrollable document.
 * Sections are server-rendered (SEO-friendly); animation is layered on
 * via the client-side Reveal wrapper. Navigation is anchor-based with
 * native CSS smooth scrolling + scroll spy (see Navbar).
 */
export default function Home() {
  return (
    <>
      <IntroVideo />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WorkExperienceSection />
        <PublicationsSection />
        <ContactSection />
      </main>
    </>
  )
}
