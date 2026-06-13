'use client'

import {
  useRef,
  useCallback,
  useEffect,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react'

type MagneticProps = {
  /** pull factor 0..1 (default 0.35) */
  strength?: number
  className?: string
  children?: ReactNode
}

/**
 * Magnetic — pulls its child toward the cursor while hovered (progressive
 * enhancement). Children stay server-rendered; this wrapper only applies a
 * translate transform to itself.
 *
 * - Mouse pointers only (touch never triggers pointermove tracking).
 * - Disabled entirely under prefers-reduced-motion.
 */
export default function Magnetic({ strength = 0.35, className = '', children }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const onMove = useCallback((e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`
  }, [strength])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = ''
  }, [])

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
      {...(enabled ? { onPointerMove: onMove, onPointerLeave: onLeave } : {})}
    >
      {children}
    </span>
  )
}
