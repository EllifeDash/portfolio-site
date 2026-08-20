import { useEffect, useRef } from 'react'
import type { CSSProperties, FC, ReactElement } from 'react'

export interface MarqueeItem {
  icon: ReactElement
  color: string
  label: string
  customClass?: string
}

interface IconMarqueeProps {
  items: MarqueeItem[]
  direction?: 'left' | 'right'
  duration?: number
  glassBg?: string
  backBrightness?: number
  backOpacity?: number
  className?: string
}

const COPIES = 4

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
}

const IconMarquee: FC<IconMarqueeProps> = ({
  items,
  direction = 'left',
  duration = 40,
  glassBg = 'hsla(0, 0%, 100%, 0.05)',
  backBrightness = 0.6,
  backOpacity = 1,
  className,
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const track = root.querySelector<HTMLElement>('.icon-marquee__track')
    if (!track) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          track.style.animationPlayState = entry.isIntersecting
            ? 'running'
            : 'paused'
        }
      },
      { threshold: 0.05 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  if (items.length === 0) return null

  const repeated = Array.from({ length: COPIES }, () => items).flat()

  const getBackgroundStyle = (color: string): CSSProperties =>
    gradientMapping[color]
      ? { background: gradientMapping[color] }
      : { background: color }

  return (
    <div
      ref={rootRef}
      className={`icon-marquee icon-marquee--${direction} ${className ?? ''}`.trim()}
      style={
        {
          '--glass-bg': glassBg,
          '--marquee-duration': `${duration}s`,
          '--back-brightness': `${backBrightness}`,
          '--back-opacity': `${backOpacity}`,
        } as CSSProperties
      }
    >
      <div className="icon-marquee__track">
        {repeated.map((item, index) => {
          const isOriginal = index < items.length
          return (
            <button
              key={`${item.label}-${index}`}
              type="button"
              aria-label={item.label}
              aria-hidden={isOriginal ? undefined : 'true'}
              tabIndex={isOriginal ? undefined : -1}
              className={`glass-tile relative bg-transparent outline-none border-none cursor-pointer w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
                item.customClass ?? ''
              }`.trim()}
            >
              <span
                className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
                style={{
                  ...getBackgroundStyle(item.color),
                  filter:
                    'brightness(var(--back-brightness)) saturate(0.9)',
                  opacity: 'var(--back-opacity)',
                  boxShadow: '0.3em -0.3em 0.6em hsla(223, 10%, 10%, 0.06)',
                }}
              />
              <span
                className="absolute top-0 left-0 w-full h-full rounded-[1.25em] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] [will-change:transform] group-hover:[transform:translate3d(0,0,2em)]"
                style={{
                  background: 'var(--glass-bg)',
                  boxShadow: '0 0 0 0.08em hsla(0, 0%, 100%, 0.12) inset',
                }}
              >
                <span
                  className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </span>
              <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default IconMarquee