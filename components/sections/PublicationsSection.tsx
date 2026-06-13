import type { ElementType } from 'react'
import { FiArrowUpRight, FiAward } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import Tilt3D from '@/components/ui/Tilt3D'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/PublicationsSection.module.css'

const VISIBLE_CERTS = 6

type Cert = {
  title: string
  issuer: string
  issued: string
  expires?: string
  credentialId?: string
  url?: string
}

function CertCard({ cert }: { cert: Cert }) {
  const Wrapper: ElementType = cert.url ? 'a' : 'div'
  const linkProps = cert.url
    ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}
  return (
    <Wrapper className={styles.certCard} {...linkProps}>
      <div className={styles.certCardTop}>
        <h4 className={styles.certTitle}>{cert.title}</h4>
        {cert.url && <FiArrowUpRight className={styles.certArrow} aria-hidden="true" />}
      </div>
      <span className={styles.certIssuer}>{cert.issuer}</span>
      <span className={styles.certMeta}>
        {cert.issued}{cert.expires ? ` · Expires ${cert.expires}` : ''}
      </span>
    </Wrapper>
  )
}

export default function PublicationsSection() {
  const featuredCerts = profile.certifications.slice(0, VISIBLE_CERTS)
  const moreCerts = profile.certifications.slice(VISIBLE_CERTS)

  return (
    <section id="publications" className={`${styles.section} section`} aria-labelledby="pub-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">Credentials</p>
            <h2 id="pub-title" className={styles.title}>Publications &amp; certifications</h2>
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={80}>
            Certifications and continued learning across cloud, AI, and modern architecture.
          </Reveal>
        </div>

        {/* ── Featured publications ── */}
        <ul className={styles.list}>
          {profile.publications.map((pub, i) => (
            <Reveal as="li" key={pub.id} delay={i * 70}>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <span className={styles.num} aria-hidden="true">0{i + 1}</span>
                <div className={styles.itemBody}>
                  <div className={styles.itemTop}>
                    <h3 className={styles.itemTitle}>{pub.title}</h3>
                    <span className={styles.platform}>{pub.platform}</span>
                  </div>
                  <p className={styles.itemDesc}>{pub.desc}</p>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.year}>{pub.year}</span>
                  <span className={styles.read}>View <FiArrowUpRight aria-hidden="true" /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        {/* ── All certifications ── */}
        <Reveal className={styles.certHeadRow}>
          <h3 className={styles.blockTitle}>
            Certifications <span className={styles.count}>({profile.certifications.length})</span>
          </h3>
          {profile.certificationsUrl && (
            <a
              className={styles.panelLink}
              href={profile.certificationsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View all on LinkedIn <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </Reveal>

        <ul className={styles.certGrid}>
          {featuredCerts.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 3) * 60}>
              <Tilt3D className="tilt-fill" max={8}>
                <CertCard cert={c} />
              </Tilt3D>
            </Reveal>
          ))}
        </ul>

        {moreCerts.length > 0 && (
          /* Native <details> keeps this a server component: no client JS,
             remaining certs stay in the DOM for SEO. */
          <details className={styles.certMore}>
            <summary className={styles.certMoreBtn}>
              <span className={styles.showLabel}>
                Show all {profile.certifications.length} certifications
              </span>
              <span className={styles.hideLabel}>Show less</span>
            </summary>
            <ul className={styles.certGrid}>
              {moreCerts.map((c) => (
                <li key={c.title}>
                  <Tilt3D className="tilt-fill" max={8}>
                    <CertCard cert={c} />
                  </Tilt3D>
                </li>
              ))}
            </ul>
          </details>
        )}

        {/* ── Education + honors ── */}
        <div className={styles.grid}>
          <Reveal>
            <Tilt3D className={styles.panel} max={4}>
            <h3 className={styles.panelTitle}>Education</h3>
            <ol className={styles.eduList}>
              {profile.education.map((edu) => (
                <li key={edu.institution} className={styles.eduItem}>
                  <span className={styles.eduPeriod}>{edu.period}</span>
                  <span className={styles.eduDegree}>{edu.degree}</span>
                  <span className={styles.eduInst}>{edu.institution}</span>
                  {edu.field && <span className={styles.eduField}>{edu.field}</span>}
                </li>
              ))}
            </ol>
            </Tilt3D>
          </Reveal>

          <Reveal delay={90}>
            <Tilt3D className={styles.panel} max={4}>
            <h3 className={styles.panelTitle}>Honors &amp; awards</h3>
            <ul className={styles.awardList}>
              {profile.honors.map((h) => (
                <li key={h} className={styles.awardItem}>
                  <FiAward className={styles.awardIcon} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            </Tilt3D>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
