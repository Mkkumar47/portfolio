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

        {/* ── Publications / certifications list ── */}
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

            <h3 className={`${styles.panelTitle} ${styles.panelTitleSpaced}`}>Certifications</h3>
            <ul className={styles.certList}>
              {profile.certifications.map((c) => (
                <li key={c} className={styles.certItem}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
