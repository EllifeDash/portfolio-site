import type { ReactNode } from 'react'

export default function Section({
  id,
  className = '',
  fullBleed = false,
  children,
}: {
  id?: string
  className?: string
  fullBleed?: boolean
  children: ReactNode
}) {
  return (
    <section id={id} className={`section ${className}`}>
      {fullBleed ? children : <div className="section-inner">{children}</div>}
    </section>
  )
}
