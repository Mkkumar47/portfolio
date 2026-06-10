'use client'

import { useEffect, useRef } from 'react'

/**
 * ScrollProgress — thin reading-progress bar fixed to the top of the page.
 * Decorative; hidden from assistive tech. Uses rAF-throttled scroll handler
 * and a CSS transform for cheap, jank-free updates.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let ticking = false

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0
      bar.style.transform = `scaleX(${p})`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'var(--accent)',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
