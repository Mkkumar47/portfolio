'use client'

import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiVolume2, FiVolumeX } from 'react-icons/fi'
import profile from '@/data/profile.json'
import styles from '@/styles/ui/IntroVideo.module.css'

/**
 * IntroVideo — one-time startup splash that plays about-me.mp4, then reveals
 * the page.
 *
 * Audio: browsers block autoplay WITH sound, so the clip must start muted to
 * play at all. On mount we make a best-effort attempt to unmute; if the
 * browser refuses, it falls back to muted and the user can enable sound with
 * the speaker button.
 *
 * a11y: auto-dismiss on end, "Skip intro" button + Escape, once per session,
 * skipped entirely for prefers-reduced-motion, body scroll locked while shown.
 */
export default function IntroVideo() {
  const [show, setShow] = useState(true)
  const [closing, setClosing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const videoRef = useRef(null)
  const dismissedRef = useRef(false)
  const skipBtnRef = useRef(null)

  function dismiss() {
    if (dismissedRef.current) return
    dismissedRef.current = true
    try { sessionStorage.setItem('introSeen', '1') } catch {}
    setClosing(true)
    window.setTimeout(() => {
      document.body.style.overflow = ''
      setShow(false)
    }, 650)
  }

  function toggleSound() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setSoundOn(!v.muted)
    if (!v.muted) v.play().catch(() => {})
  }

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try { seen = sessionStorage.getItem('introSeen') === '1' } catch {}

    if (reduce || seen) {
      dismissedRef.current = true
      setShow(false)
      return
    }

    document.body.style.overflow = 'hidden'
    skipBtnRef.current?.focus()

    const v = videoRef.current
    if (v) {
      // Guarantee playback (muted), then best-effort unmute.
      v.muted = true
      v.play().catch(() => {})
      v.muted = false
      v.play()
        .then(() => setSoundOn(true))
        .catch(() => {
          v.muted = true
          setSoundOn(false)
          v.play().catch(() => {})
        })
    }

    const onKey = (e) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    const safety = window.setTimeout(dismiss, 16000)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(safety)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) return null

  function onTimeUpdate(e) {
    const v = e.currentTarget
    if (v.duration) setProgress((v.currentTime / v.duration) * 100)
  }

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ''}`}
      role="dialog"
      aria-label="Intro"
      aria-modal="true"
    >
      <video
        ref={videoRef}
        className={styles.video}
        src="/assets/about-me.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
        onEnded={dismiss}
        onError={dismiss}
        onTimeUpdate={onTimeUpdate}
        aria-hidden="true"
      />

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.role}>{profile.roles.short}</span>
        <h1 className={styles.name}>{profile.name.full}</h1>
        <span className={styles.tag}>{profile.location.based}</span>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.sound}
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? 'Mute intro' : 'Unmute intro'}
        >
          {soundOn ? <FiVolume2 aria-hidden="true" /> : <FiVolumeX aria-hidden="true" />}
          <span>{soundOn ? 'Sound on' : 'Sound off'}</span>
        </button>

        <button
          ref={skipBtnRef}
          type="button"
          className={styles.skip}
          onClick={dismiss}
        >
          Skip intro <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
