import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export function btnClass(variant: ButtonVariant = 'primary') {
  return `btn btn-${variant}`
}

type ButtonProps = {
  variant?: ButtonVariant
  className?: string
} & (
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ href: string; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>)
)

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', ...rest } = props
  const cls = `${btnClass(variant)} ${className}`

  if ('href' in rest && rest.href !== undefined) {
    const { href, external, target, rel, ...anchorProps } =
      rest as { href: string; external?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>
    const finalTarget = target ?? (external ? '_blank' : undefined)
    const finalRel = rel ?? (external ? 'noopener noreferrer' : undefined)
    return (
      <a className={cls} href={href} target={finalTarget} rel={finalRel} {...anchorProps} />
    )
  }

  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
}
