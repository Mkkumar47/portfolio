import { FiArrowUpRight, FiAward } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/PublicationsSection.module.css'

export default function PublicationsSection() {
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
          {profile.certifications.map((c, i) => {
            const Wrapper = c.url ? 'a' : 'div'
            const linkProps = c.url
              ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <Reveal as="li" key={c.title} delay={(i % 3) * 60}>
                <Wrapper className={styles.certCard} {...linkProps}>
                  <div className={styles.certCardTop}>
                    <h4 className={styles.certTitle}>{c.title}</h4>
                    {c.url && <FiArrowUpRight className={styles.certArrow} aria-hidden="true" />}
                  </div>
                  <span className={styles.certIssuer}>{c.issuer}</span>
                  <span className={styles.certMeta}>
                    {c.issued}{c.expires ? ` · Expires ${c.expires}` : ''}
                  </span>
                </Wrapper>
              </Reveal>
            )
          })}
        </ul>

        {/* ── Education + honors ── */}
        <div className={styles.grid}>
          <Reveal className={styles.panel}>
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
          </Reveal>

          <Reveal className={styles.panel} delay={90}>
            <h3 className={styles.panelTitle}>Honors &amp; awards</h3>
            <ul className={styles.awardList}>
              {profile.honors.map((h) => (
                <li key={h} className={styles.awardItem}>
                  <FiAward className={styles.awardIcon} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
