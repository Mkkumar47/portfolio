'use client'

import { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import profile from '@/data/profile.json'
import styles from '@/styles/ui/StickyHireCTA.module.css'

/**
 * StickyHireCTA — floating "Hire Me" pill that appears once the visitor
 * scrolls past the hero and hides while the contact section is in view
 * (where the full contact CTAs already live).
 */
export default function StickyHireCTA() {
  const [pastHero, setPastHero] = useState(false)
  const [atContact, setAtContact] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    const contact = document.getElementById('contact')
    if (!hero || !contact) return

    const heroIO = new IntersectionObserver(
      ([e]) => setPastHero(!e.isIntersecting),
      { threshold: 0.25 },
    )
    const contactIO = new IntersectionObserver(
      ([e]) => setAtContact(e.isIntersecting),
      { threshold: 0.1 },
    )
    heroIO.observe(hero)
    contactIO.observe(contact)
    return () => {
      heroIO.disconnect()
      contactIO.disconnect()
    }
  }, [])

  const visible = pastHero && !atContact

  return (
    <a
      href={`mailto:${profile.email}?subject=Opportunity%20for%20${encodeURIComponent(profile.name.full)}`}
      className={`${styles.cta} ${visible ? styles.visible : ''}`}
      aria-hidden={visible ? undefined : 'true'}
      tabIndex={visible ? 0 : -1}
    >
      <span className={styles.dot} aria-hidden="true" />
      Hire me
      <FiSend aria-hidden="true" />
    </a>
  )
}
