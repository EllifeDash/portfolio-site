import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const DEFAULT_INNER_GRADIENT =
  'linear-gradient(145deg, rgba(18, 18, 32, 0.95) 0%, rgba(22, 33, 62, 0.8) 100%)'

const SCROLL_TILT_KEYFRAMES: Keyframe[] = [
  { transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)', offset: 0 },
  { transform: 'translateZ(0) rotateX(-3deg) rotateY(-12deg)', offset: 0.45 },
  { transform: 'translateZ(0) rotateX(1.5deg) rotateY(6deg)', offset: 0.75 },
  { transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)', offset: 1 },
]

const clamp = (v: number, min = 0, max = 100): number =>
  Math.min(Math.max(v, min), max)

interface ProfileCardProps {
  avatarUrl?: string
  innerGradient?: string
  behindGlowEnabled?: boolean
  behindGlowColor?: string
  behindGlowSize?: string
  glareOpacity?: number
  className?: string
  miniAvatarUrl?: string
  name?: string
  title?: string
  handle?: string
  status?: string
  contactText?: string
  showUserInfo?: boolean
  height?: string
  maxHeight?: string
  onContactClick?: () => void
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '/profile-card.png',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(0, 212, 170, 0.4)',
  behindGlowSize = '50%',
  glareOpacity = 0.55,
  className = '',
  miniAvatarUrl,
  name = 'Abdullah Tayyab',
  handle = '@ellifedash',
  status = 'Open to Work',
  contactText = 'Contact',
  showUserInfo = true,
  height = '80svh',
  maxHeight = '540px',
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const setPointerVars = useCallback((percentX: number, percentY: number): void => {
    const wrap = wrapRef.current
    if (!wrap) return

    const properties: Record<string, string> = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--pointer-from-left': `${percentX / 100}`,
      '--pointer-from-top': `${percentY / 100}`,
    }

    for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v)
  }, [])

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current
      if (!shell) return
      const rect = shell.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setPointerVars(
        clamp((100 / shell.clientWidth) * x),
        clamp((100 / shell.clientHeight) * y)
      )
    },
    [setPointerVars]
  )

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const pointerMoveHandler = handlePointerMove as EventListener
    shell.addEventListener('pointermove', pointerMoveHandler)
    return () => shell.removeEventListener('pointermove', pointerMoveHandler)
  }, [handlePointerMove])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const section = wrap.querySelector('section')
    if (!section) return

    if (reducedMotion) return

    let playing = false

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playing) {
            playing = true
            const anim = section.animate(SCROLL_TILT_KEYFRAMES, {
              duration: 950,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'both',
            })
            anim.finished.finally(() => {
              playing = false
            })
          }
        }
      },
      { threshold: 0.3 }
    )

    io.observe(wrap)
    return () => io.disconnect()
  }, [reducedMotion])

  const cardRadius = '30px'

  const cardStyle = useMemo(
    () => ({
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor ?? 'rgba(0, 212, 170, 0.4)',
      '--behind-glow-size': behindGlowSize ?? '50%',
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--pointer-from-top': '0.5',
      '--pointer-from-left': '0.5',
      '--card-radius': cardRadius,
    }),
    [innerGradient, behindGlowColor, behindGlowSize, cardRadius]
  )

  const handleContactClick = useCallback((): void => {
    onContactClick?.()
  }, [onContactClick])

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      rgba(255, 255, 255, 0.3) 0%,
      transparent 65%
    )`,
    mixBlendMode: 'soft-light',
    opacity: glareOpacity,
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none',
  }

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`.trim()}
      style={{ perspective: '500px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle } as React.CSSProperties}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: 'blur(50px) saturate(1.1)',
            opacity: 0.22,
          }}
        />
      )}
      <div ref={shellRef} className="relative z-[1] group">
        <section
          className="grid relative overflow-hidden"
          style={{
            height,
            maxHeight,
            aspectRatio: '0.718',
            borderRadius: cardRadius,
            background: 'rgba(0, 0, 0, 0.9)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1',
            }}
          >
            {/* Glare layer */}
            <div style={glareStyle} />

            {/* Avatar content */}
            <div
              className="overflow-visible"
              style={{
                transform: 'translateZ(2px)',
                gridArea: '1 / -1',
                borderRadius: cardRadius,
                pointerEvents: 'none',
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                className="w-full absolute left-1/2 top-0 will-change-transform transition-transform duration-[120ms] ease-out"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                style={{
                  transformOrigin: '50% 0%',
                  transform:
                    'translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02)) scaleX(calc(1 + (var(--pointer-from-left) - 0.5) * 0.01))',
                  borderRadius: cardRadius,
                  backfaceVisibility: 'hidden',
                }}
                onError={e => {
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                }}
              />
              {showUserInfo && (
                <div
                  className="absolute z-[2] flex items-center justify-between backdrop-blur-[30px] border border-white/10 pointer-events-auto"
                  style={
                    {
                      '--ui-inset': '20px',
                      '--ui-radius-bias': '6px',
                      bottom: 'var(--ui-inset)',
                      left: 'var(--ui-inset)',
                      right: 'var(--ui-inset)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 'calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)))',
                      padding: '12px 14px',
                    } as React.CSSProperties
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full overflow-hidden border border-white/10 flex-shrink-0"
                      style={{ width: '48px', height: '48px' }}
                    >
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name || 'User'} mini avatar`}
                        loading="lazy"
                        style={{ display: 'block', gridArea: 'auto', borderRadius: '50%', pointerEvents: 'auto' }}
                        onError={e => {
                          const t = e.target as HTMLImageElement
                          t.style.opacity = '0.5'
                          t.src = avatarUrl
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="text-sm font-medium text-white/90 leading-none">@{handle}</div>
                      <div className="text-sm text-white/70 leading-none">{status}</div>
                    </div>
                  </div>
                  <button
                    className="border border-white/10 rounded-lg px-4 py-3 text-xs font-semibold text-white/90 cursor-pointer backdrop-blur-[10px] transition-[background-color,border-color,transform] duration-200 ease-out hover:border-white/40 hover:-translate-y-px"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto', display: 'block', gridArea: 'auto', borderRadius: '8px' }}
                    type="button"
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const ProfileCard = React.memo(ProfileCardComponent)
export default ProfileCard