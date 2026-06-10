'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Reveal — progressive-enhancement scroll animation wrapper.
 *
 * Content is rendered immediately (SSR-friendly, good for SEO). On mount,
 * an IntersectionObserver toggles `data-reveal="in"`, which the CSS in
 * globals.css transitions. `prefers-reduced-motion` is fully respected
 * there, so this component never blocks content visibility.
 *
 * @param {string}  as        - element/tag to render (default "div")
 * @param {number}  delay     - stagger delay in ms
 * @param {number}  threshold - IO threshold (default 0.15)
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  threshold = 0.15,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If reduced motion, reveal immediately and skip the observer.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? 'in' : ''}
      className={className}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
