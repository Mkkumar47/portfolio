import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import Reveal from '@/components/ui/Reveal'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/ProjectsSection.module.css'

export default function ProjectsSection() {
  return (
    <section id="projects" className={`${styles.section} section`} aria-labelledby="projects-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 id="projects-title" className={styles.title}>Projects &amp; platforms</h2>
          </Reveal>
          <Reveal as="p" className={styles.lead} delay={80}>
            Enterprise systems I&apos;ve led and built — from Salesforce integrations to analytics platforms.
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {profile.projects.map((proj, i) => (
            <Reveal as="li" key={proj.id} className={styles.card} delay={i * 90}>
              <div className={styles.thumb}>
                <Image
                  src={proj.image}
                  alt={`${proj.title} preview`}
                  fill
                  quality={85}
                  sizes="(min-width: 800px) 48vw, 90vw"
                  className={styles.thumbImg}
                />
                <span className={styles.typeTag}>{proj.type}</span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{proj.title}</h3>
                <p className={styles.cardSub}>{proj.subtitle}</p>
                <p className={styles.cardDesc}>{proj.desc}</p>

                <ul className={styles.stack} aria-label="Technologies used">
                  {proj.tech.map((t) => (
                    <li key={t} className={styles.tag}>{t}</li>
                  ))}
                </ul>

                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={`View ${proj.title}`}
                >
                  View project <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
