import Image from 'next/image'
import { FaGithub, FaLinkedinIn, FaInstagram, FaMedium } from 'react-icons/fa'
import { FiArrowUpRight, FiArrowDown, FiDownload, FiSend } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import Tilt3D from '@/components/ui/Tilt3D'
import profile from '@/data/profile.json'
import content from '@/data/content.json'
import styles from '@/styles/sections/HeroSection.module.css'

const ICONS = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Medium: FaMedium,
}

export default function HeroSection() {
  const stats = [...profile.stats.slice(0, 2), content.hero.specialistStat]

  return (
    <section id="home" className={`${styles.section} section`} aria-labelledby="hero-name">
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

          <Reveal className={styles.pills} delay={240}>
            {content.hero.pills.map((tag) => (
              <span key={tag} className={styles.pill}>{tag}</span>
            ))}
          </Reveal>

          <Reveal className={styles.ctas} delay={300}>
            <a href="#contact" className={styles.btnPrimary}>
              {content.hero.ctaHire} <FiSend aria-hidden="true" />
            </a>
            <a
              href={content.hero.resumeHref}
              download
              className={styles.btnSecondary}
            >
              {content.hero.ctaResume} <FiDownload aria-hidden="true" />
            </a>
            <a href="#projects" className={styles.btnGhost}>
              {content.hero.ctaProjects} <FiArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal className={styles.stats} delay={360}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* ── Portrait column ── */}
        <Reveal className={styles.media} delay={150}>
          <Tilt3D className={styles.photoFrame} max={6}>
            <Image
              src="/assets/hero.jpeg"
              alt={`Portrait of ${profile.name.full}`}
              fill
              priority
              quality={90}
              sizes="(min-width: 980px) 42vw, 90vw"
              className={styles.photo}
            />
            <span className={styles.photoGlow} aria-hidden="true" />
          </Tilt3D>

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

      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <FiArrowDown aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  )
}
