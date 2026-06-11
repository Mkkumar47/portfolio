'use client'

import { useEffect, useRef } from 'react'

/**
 * SceneBackground — full-page Three.js backdrop (fixed, behind all content).
 *
 * A drifting particle starfield plus two wireframe icosahedrons that react
 * to mouse position (parallax) and scroll progress (rotation + hue shift).
 *
 * Performance & a11y:
 * - Skipped entirely when `prefers-reduced-motion: reduce`.
 * - Particle count halves on small screens; DPR capped at 1.75.
 * - rAF loop pauses when the tab is hidden.
 * - three.js is imported dynamically so it never blocks first paint.
 * - `pointer-events: none` + `aria-hidden` — purely decorative.
 */
export default function SceneBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import('three')
      if (disposed) return

      const isSmall = window.innerWidth < 768
      const COUNT = isSmall ? 700 : 1600

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0a0a0e, 0.055)

      const camera = new THREE.PerspectiveCamera(
        60, window.innerWidth / window.innerHeight, 0.1, 100,
      )
      camera.position.z = 14

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      renderer.setSize(window.innerWidth, window.innerHeight)
      mount.appendChild(renderer.domElement)

      /* ── Particle field ── */
      const positions = new Float32Array(COUNT * 3)
      const speeds = new Float32Array(COUNT)
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 44
        positions[i * 3 + 1] = (Math.random() - 0.5) * 26
        positions[i * 3 + 2] = (Math.random() - 0.5) * 24
        speeds[i] = 0.15 + Math.random() * 0.5
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      })
      const points = new THREE.Points(geo, mat)
      scene.add(points)

      /* ── Wireframe geometry (depth anchors) ── */
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.16,
      })
      const icoA = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 1), wireMat)
      icoA.position.set(7.5, 2.4, -4)
      const icoB = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.1, 0),
        new THREE.MeshBasicMaterial({
          color: 0xa5a5b5, wireframe: true, transparent: true, opacity: 0.1,
        }),
      )
      icoB.position.set(-8.5, -3.2, -6)
      scene.add(icoA, icoB)

      /* ── Interaction state ── */
      let mouseX = 0
      let mouseY = 0
      let scrollP = 0
      let raf = 0
      let running = true

      const onMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1
        mouseY = (e.clientY / window.innerHeight) * 2 - 1
      }
      const onScroll = () => {
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        scrollP = max > 0 ? doc.scrollTop / max : 0
      }
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      const onVisibility = () => {
        running = document.visibilityState === 'visible'
        if (running) loop()
      }

      const clock = new THREE.Clock()
      function loop() {
        if (!running || disposed) return
        raf = requestAnimationFrame(loop)
        const t = clock.getElapsedTime()

        /* drift particles upward, wrap around */
        const pos = geo.attributes.position
        for (let i = 0; i < COUNT; i++) {
          let y = pos.getY(i) + speeds[i] * 0.008
          if (y > 13) y = -13
          pos.setY(i, y)
        }
        pos.needsUpdate = true

        points.rotation.y = t * 0.02 + scrollP * 1.2
        icoA.rotation.x = t * 0.12 + scrollP * 2.4
        icoA.rotation.y = t * 0.16
        icoB.rotation.x = -t * 0.1
        icoB.rotation.y = t * 0.14 + scrollP * 1.8

        /* scroll shifts the scene; mouse adds parallax */
        camera.position.x += (mouseX * 1.6 - camera.position.x) * 0.04
        camera.position.y += (-mouseY * 1.0 - scrollP * 2.5 - camera.position.y) * 0.04
        camera.lookAt(0, -scrollP * 2.5, 0)

        renderer.render(scene, camera)
      }
      loop()

      window.addEventListener('pointermove', onMouse, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      document.addEventListener('visibilitychange', onVisibility)

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('pointermove', onMouse)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        document.removeEventListener('visibilitychange', onVisibility)
        geo.dispose()
        mat.dispose()
        wireMat.dispose()
        icoB.material.dispose()
        icoA.geometry.dispose()
        icoB.geometry.dispose()
        renderer.dispose()
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement)
        }
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        /* static gradient fallback paints instantly, canvas layers on top */
        background:
          'radial-gradient(ellipse 80% 60% at 70% -10%, rgba(59,130,246,0.13), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 110%, rgba(59,130,246,0.08), transparent 60%)',
      }}
    />
  )
}
