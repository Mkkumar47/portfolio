import { FiMapPin } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import Tilt3D from '@/components/ui/Tilt3D'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/WorkExperienceSection.module.css'

export default function WorkExperienceSection() {
  return (
    <section id="experience" className={`${styles.section} section`} aria-labelledby="experience-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">Career</p>
            <h2 id="experience-title" className={styles.title}>Work experience</h2>
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={80}>
            8+ years across {profile.stats[1].value} enterprise companies, leading teams and shipping high-impact platforms.
          </Reveal>
        </div>

        <ol className={styles.timeline}>
          {profile.experience.map((exp, i) => (
            <Reveal as="li" key={exp.id} className={styles.entry} delay={i * 70}>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.dot} />
              </div>

              <Tilt3D as="article" className={styles.card} max={2.5}>
                <div className={styles.cardHead}>
                  <span className={styles.period}>{exp.period} — {exp.periodEnd}</span>
                  <span className={styles.typeTag}>{exp.type}</span>
                </div>

                <h3 className={styles.role}>{exp.role}</h3>
                <p className={styles.company}>
                  {exp.company}
                  {exp.location && (
                    <span className={styles.location}>
                      <FiMapPin aria-hidden="true" /> {exp.location}
                    </span>
                  )}
                </p>

                <ul className={styles.bullets}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className={styles.bullet}>{b}</li>
                  ))}
                </ul>

                <ul className={styles.stack} aria-label="Technologies used">
                  {exp.tech.map((t) => (
                    <li key={t} className={styles.tag}>{t}</li>
                  ))}
                </ul>
              </Tilt3D>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
