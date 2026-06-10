'use client'

import { useEffect, useRef, useState } from 'react'
import profile from '@/data/profile.json'
import styles from '@/styles/ui/Navbar.module.css'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'

const NAV_ITEMS = [
  { label: 'Home',         id: 'home' },
  { label: 'About',        id: 'about' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Publications', id: 'publications' },
  { label: 'Contact',      id: 'contact' },
]

export default function Navbar() {
  const [active, setActive]   = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuBtnRef = useRef(null)

  /* ── Scroll spy + condensed-on-scroll state ── */
  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry most in view.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => io.observe(s))

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /* ── Lock body + Escape to close mobile menu ── */
  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
    menuBtnRef.current?.focus()
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} aria-label="Primary">
        {/* Brand */}
        <a href="#home" className={styles.brand} aria-label={`${profile.name.full} — home`}>
          <span className={styles.monogram} aria-hidden="true">
            {profile.name.first[0]}{profile.name.last[0]}
          </span>
          <span className={styles.brandName}>{profile.name.full}</span>
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.link} ${active === id ? styles.active : ''}`}
                aria-current={active === id ? 'true' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className={styles.cta}>
          Get in touch <FiArrowUpRight aria-hidden="true" />
        </a>

        {/* Mobile toggle */}
        <button
          ref={menuBtnRef}
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        hidden={!menuOpen}
      >
        <ul className={styles.drawerLinks}>
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.drawerLink} ${active === id ? styles.drawerActive : ''}`}
                aria-current={active === id ? 'true' : undefined}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${profile.email}`} className={styles.drawerMail} onClick={closeMenu}>
          {profile.email}
        </a>
      </div>
    </header>
  )
}
