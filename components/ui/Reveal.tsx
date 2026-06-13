'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'

type RevealProps = {
  /** element/tag to render (default "div") */
  as?: ElementType
  /** stagger delay in ms */
  delay?: number
  /** IO threshold (default 0.15) */
  threshold?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
  [key: string]: unknown
}

/**
 * Reveal — progressive-enhancement scroll animation wrapper.
 *
 * Content is rendered immediately (SSR-friendly, good for SEO). On mount,
 * an IntersectionObserver toggles `data-reveal="in"`, which the CSS in
 * globals.css transitions. `prefers-reduced-motion` is fully respected
 * there, so this component never blocks content visibility.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  threshold = 0.15,
  className = '',
  style,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
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
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
