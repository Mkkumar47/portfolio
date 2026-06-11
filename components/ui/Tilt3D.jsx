'use client'

import { useRef, useCallback } from 'react'

/**
 * Tilt3D — pointer-tracking 3D tilt wrapper (progressive enhancement).
 *
 * Children are server-rendered and passed through untouched; this wrapper
 * only sets `--tilt-x` / `--tilt-y` CSS vars consumed by the `[data-tilt]`
 * rules in globals.css. Reduced motion disables the transform there, and
 * coarse pointers (touch) never trigger pointermove tracking.
 *
 * @param {string} as  - element/tag to render (default "div")
 * @param {number} max - max tilt in degrees (default 7)
 */
export default function Tilt3D({
  as: Tag = 'div',
  max = 7,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--tilt-x', `${(-py * max).toFixed(2)}deg`)
    el.style.setProperty('--tilt-y', `${(px * max).toFixed(2)}deg`)
  }, [max])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }, [])

  return (
    <Tag
      ref={ref}
      data-tilt=""
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
