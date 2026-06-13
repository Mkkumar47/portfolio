import Image from 'next/image'
import { FaGithub, FaLinkedinIn, FaInstagram, FaMedium } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import Reveal from '@/components/ui/Reveal'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/AboutSection.module.css'

const ICONS: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Medium: FaMedium,
}

export default function AboutSection() {
  return (
    <section id="about" className={`${styles.section} section`} aria-labelledby="about-title">
      <div className={`${styles.inner} container`}>
        {/* ── Left: portrait + socials ── */}
        <Reveal className={styles.media}>
          <div className={styles.photoFrame}>
            <Image
              src="/assets/about.jpeg"
              alt={`${profile.name.full} working`}
              fill
              quality={85}
              sizes="(min-width: 900px) 34vw, 90vw"
              className={styles.photo}
            />
          </div>
          <p className={styles.signature}>{profile.name.full}</p>
          <ul className={styles.socials} aria-label="Social profiles">
            {profile.socials.map(({ label, href }) => {
              const Icon = ICONS[label]
              if (!Icon) return null
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={label}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* ── Right: bio + skills ── */}
        <div className={styles.content}>
          <Reveal as="p" className="eyebrow">About me</Reveal>
          <Reveal as="h2" id="about-title" className={styles.title} delay={60}>
            Engineering enterprise software that delivers measurable value
          </Reveal>
          <Reveal as="p" className={styles.bio} delay={120}>
            {profile.bio}
          </Reveal>

          <Reveal className={styles.skillsBlock} delay={180}>
            <h3 className={styles.subhead}>Core skills</h3>
            <ul className={styles.skills}>
              {profile.skills.map((skill) => (
                <li key={skill} className={styles.skill}>{skill}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={styles.metaGrid} delay={240}>
            <div className={styles.langs}>
              <h3 className={styles.subhead}>Languages</h3>
              <ul className={styles.langList}>
                {profile.languages.map((l) => (
                  <li key={l.name} className={styles.langItem}>
                    <span className={styles.langName}>{l.name}</span>
                    <span className={styles.langLevel}>{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.stats}>
              {profile.stats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
