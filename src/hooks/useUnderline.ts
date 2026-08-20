import { useEffect, useRef } from 'react'

export function useUnderline<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let timer: number | undefined

    const run = () => {
      if (timer !== undefined) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        el.classList.remove('underline-run')
        void el.offsetWidth
        el.classList.add('underline-run')
        timer = window.setTimeout(
          () => el.classList.remove('underline-run'),
          1600,
        )
      }, 250)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) run()
        }
      },
      { threshold: 0.9 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [])

  return ref
}