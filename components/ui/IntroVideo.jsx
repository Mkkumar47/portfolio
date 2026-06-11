'use client'

import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiVolume2, FiVolumeX } from 'react-icons/fi'
import profile from '@/data/profile.json'
import styles from '@/styles/ui/IntroVideo.module.css'

/**
 * IntroVideo — one-time startup splash that plays about-me.mp4, then reveals
 * the page.
 *
 * Audio: tries to start with sound on by default. If browser autoplay policy
 * blocks sound, it falls back to muted playback and enables sound on the
 * first user interaction.
 *
 * a11y: auto-dismiss on end, "Skip intro" button + Escape, once per session,
 * skipped entirely for prefers-reduced-motion, body scroll locked while shown.
 */
export default function IntroVideo() {
  const [show, setShow] = useState(true)
  const [closing, setClosing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
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
    const UNLOCK_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'click']
    let unlockAudio
    if (v) {
      const enableAudio = () => {
        v.defaultMuted = false
        v.muted = false
        v.volume = 1
        setSoundOn(true)
        v.play().catch(() => {})
      }

      const installFirstInteractionUnlock = () => {
        unlockAudio = () => {
          enableAudio()
        }
        UNLOCK_EVENTS.forEach((ev) =>
          window.addEventListener(ev, unlockAudio, { once: true }),
        )
      }

      // Start with sound on by default.
      enableAudio()

      v.play()
        .then(() => {
          // Some browsers may keep autoplay effectively muted; recover on first interaction.
          if (v.muted || v.volume === 0) {
            v.defaultMuted = true
            v.muted = true
            setSoundOn(false)
            installFirstInteractionUnlock()
          } else {
            setSoundOn(true)
          }
        })
        .catch(() => {
          v.defaultMuted = true
          v.muted = true
          setSoundOn(false)
          v.play().catch(() => {})
          installFirstInteractionUnlock()
        })
    }

    const onKey = (e) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    const safety = window.setTimeout(dismiss, 16000)

    return () => {
      if (unlockAudio) {
        UNLOCK_EVENTS.forEach((ev) => window.removeEventListener(ev, unlockAudio))
      }
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
