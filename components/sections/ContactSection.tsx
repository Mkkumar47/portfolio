import {
  FaGithub, FaLinkedinIn, FaInstagram, FaMedium,
} from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { FiMail, FiPhone, FiMapPin, FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import profile from '@/data/profile.json'
import content from '@/data/content.json'
import styles from '@/styles/sections/ContactSection.module.css'

const ICONS: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Medium: FaMedium,
}

export default function ContactSection() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className={`${styles.section} section`} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.top}>
          <Reveal className={styles.lead}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} aria-hidden="true" />
              {content.footer.eyebrow}
            </p>
            <h2 id="contact-title" className={styles.heading}>
              {content.footer.ctaLines.join(' ')}{' '}
              <span className={styles.accent}>{content.footer.ctaAccent}</span>
            </h2>
            <p className={styles.desc}>{profile.description}</p>

            <div className={styles.ctas}>
              <a href={`mailto:${profile.email}`} className={styles.talkBtn}>
                Let&apos;s talk <FiArrowUpRight aria-hidden="true" />
              </a>
              <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className={styles.callBtn}>
                Call me
              </a>
            </div>
          </Reveal>

          <Reveal className={styles.details} delay={120}>
            <a href={`mailto:${profile.email}`} className={styles.detailRow}>
              <FiMail aria-hidden="true" />
              <span>{profile.email}</span>
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className={styles.detailRow}>
              <FiPhone aria-hidden="true" />
              <span>{profile.phone}</span>
            </a>
            <p className={styles.detailRow}>
              <FiMapPin aria-hidden="true" />
              <span>{profile.location.based}</span>
            </p>

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
        </div>

        {/* Watermark name — SVG text scales to exactly fit the container
            width, so it is always one line and perfectly centered. */}
        <svg
          className={styles.bigName}
          viewBox="0 0 1200 130"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="bigNameFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="1" stopColor="rgba(255, 255, 255, 0.015)" />
            </linearGradient>
          </defs>
          <text
            x="600"
            y="102"
            textAnchor="middle"
            textLength="1180"
            lengthAdjust="spacingAndGlyphs"
            className={styles.bigNameText}
          >
            {profile.name.full}
          </text>
        </svg>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} {profile.name.full}. All rights reserved.</p>
          <a href="#home" className={styles.toTop}>
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
