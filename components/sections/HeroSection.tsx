import { FaGithub, FaLinkedinIn, FaInstagram, FaMedium } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { FiArrowUpRight, FiArrowDown, FiDownload, FiSend } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import Tilt3D from '@/components/ui/Tilt3D'
import Magnetic from '@/components/ui/Magnetic'
import profile from '@/data/profile.json'
import content from '@/data/content.json'
import styles from '@/styles/sections/HeroSection.module.css'

const ICONS: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Medium: FaMedium,
}

export default function HeroSection() {
  const stats = [...profile.stats.slice(0, 2), content.hero.specialistStat]

  return (
    <section id="home" className={`${styles.section} section`} aria-labelledby="hero-name">
      {/* Decorative 3D motion graphics layer */}
      <div className={styles.fx} aria-hidden="true">
        <span className={styles.orbA} />
        <span className={styles.orbB} />
        <span className={styles.ring} />
      </div>

      <div className={`${styles.inner} container`}>
        {/* ── Text column ── */}
        <div className={styles.content}>
          <Reveal as="p" className={styles.greeting}>
            {profile.available && <span className={styles.availDot} aria-hidden="true" />}
            {content.hero.availableLabel}
            <span className={styles.greetingSub}>{content.hero.responseNote}</span>
          </Reveal>

          <Reveal as="h1" id="hero-name" className={styles.name} delay={60}>
            {profile.name.full}
          </Reveal>

          <Reveal as="p" className={styles.role} delay={120}>
            {profile.roles.short}
          </Reveal>

          <Reveal as="p" className={styles.tagline} delay={180}>
            {profile.tagline}
          </Reveal>

          <Reveal className={styles.pillsMarquee} delay={240}>
            <div className={styles.pillsTrack}>
              <span className={styles.pillsGroup}>
                {content.hero.pills.map((tag) => (
                  <span key={tag} className={styles.pill}>{tag}</span>
                ))}
              </span>
              {/* duplicate set makes the loop seamless; hidden from a11y tree */}
              <span className={styles.pillsGroup} aria-hidden="true">
                {content.hero.pills.map((tag) => (
                  <span key={tag} className={styles.pill}>{tag}</span>
                ))}
              </span>
            </div>
          </Reveal>

          <Reveal className={styles.ctas} delay={300}>
            <Magnetic>
              <a href="#contact" className={styles.btnPrimary}>
                {content.hero.ctaHire} <FiSend aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={content.hero.resumeHref}
                download
                className={styles.btnSecondary}
              >
                {content.hero.ctaResume} <FiDownload aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className={styles.btnGhost}>
                {content.hero.ctaProjects} <FiArrowUpRight aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal className={styles.stats} delay={360}>
            {stats.map((s) => (
              <Tilt3D key={s.label} className={styles.statCard} max={10}>
                <span className={styles.statValue} data-tilt-pop="">{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </Tilt3D>
            ))}
          </Reveal>

          <Reveal className={styles.meta} delay={420}>
            <div className={styles.locationCard}>
              <span className={styles.locationLabel}>Based in</span>
              <span className={styles.locationValue}>{profile.location.based}</span>
              <span className={styles.locationSub}>{profile.location.availability}</span>
            </div>

            <ul className={styles.socials} aria-label="Social profiles">
              {profile.socials.map(({ label, href }) => {
                const Icon = ICONS[label]
                if (!Icon) return null
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <FiArrowDown aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  )
}
