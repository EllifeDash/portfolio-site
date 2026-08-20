import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ALIAS_WORD = 'Abdullah Tayyab'
const BRAND_WORD = 'Ellife Dash'
const STATUS_LINES = [
  'Loading fonts…',
  'Preparing the stack…',
  'Sharpening pixels…',
  'Almost there…',
]
const MIN_DURATION = 1600
const MAX_DURATION = 5000
const FADE_MS = 700

function Word({ text, hidden, stagger }: { text: string; hidden: boolean; stagger: boolean }) {
  return (
    <span
      className={`preloader__word${hidden ? ' preloader__word--hidden' : ''}${
        stagger ? ' preloader__word--visible' : ''
      }`}
    >
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="preloader__char"
          style={{ animationDelay: `${0.03 * i}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export function Preloader() {
  const fillRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<'alias' | 'swap' | 'name'>(
    reducedMotion ? 'name' : 'alias',
  )
  const [status, setStatus] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const body = document.body
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const start = performance.now()
    let ready = false
    let progress = 0
    let swapped = false
    let named = false
    let raf = 0
    let statusTimer = 0

    const finish = () => {
      cancelAnimationFrame(raf)
      window.clearInterval(statusTimer)
      body.style.overflow = prevOverflow
      setDone(true)
      window.setTimeout(() => setGone(true), FADE_MS + 50)
    }

    Promise.race([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((resolve) => window.setTimeout(resolve, MAX_DURATION)),
    ]).then(() => {
      ready = true
    })

    const tick = (now: number) => {
      const elapsed = now - start
      const minElapsed = elapsed >= MIN_DURATION
      const target = ready && minElapsed ? 1 : Math.min(0.9, (elapsed / MIN_DURATION) * 0.9)
      progress += (target - progress) * 0.1
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`
      if (!reducedMotion && !swapped && progress >= 0.35) {
        swapped = true
        setPhase('swap')
      }
      if (!reducedMotion && !named && progress >= 0.5) {
        named = true
        setPhase('name')
      }
      if (ready && progress > 0.995) {
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    statusTimer = window.setInterval(() => {
      setStatus((s) => (s + 1) % STATUS_LINES.length)
    }, 550)

    return () => {
      cancelAnimationFrame(raf)
      window.clearInterval(statusTimer)
      body.style.overflow = prevOverflow
    }
  }, [])

  if (gone) return null

  return (
    <div className={`preloader${done ? ' preloader--done' : ''}`} aria-hidden={done}>
      <div className="preloader__mark" aria-hidden="true">
        <Word text={ALIAS_WORD} hidden={phase !== 'alias'} stagger={false} />
        <Word text={BRAND_WORD} hidden={phase !== 'name'} stagger={phase === 'name'} />
      </div>
      <div className="preloader__bar">
        <div ref={fillRef} className="preloader__fill" />
      </div>
      <p className="preloader__status" role="status" aria-live="polite">
        {STATUS_LINES[status]}
      </p>
    </div>
  )
}