import type { CSSProperties, FC } from 'react'
import { STACK_ICONS } from '../../data/stackIcons'
import type { StackIconName } from '../../data/stackIcons'

interface StackIconProps {
  name: StackIconName
  variant?: 'light' | 'dark' | 'grayscale'
  className?: string
  style?: CSSProperties
}

const HEX = '#[0-9a-fA-F]{6}'

const recolor = (svg: string) =>
  svg
    .replace(new RegExp(` fill="url\\(#[a-z]+\\)"`, 'g'), ' fill="currentColor"')
    .replace(new RegExp(` fill="${HEX}"`, 'g'), ' fill="currentColor"')
    .replace(new RegExp(` stroke="${HEX}"`, 'g'), ' stroke="currentColor"')
    .replace(new RegExp(` stop-color="${HEX}"`, 'g'), ' stop-color="currentColor"')

const monochrome = (name: StackIconName, svg: string) => {
  switch (name) {
    case 'js': // drop yellow square, keep JS glyph
    case 'npm': // drop red square, keep npm wordmark
      return recolor(svg).replace(
        / fill="currentColor" d="M(?:100 0H0v100h100z|0 0h100v100H0z)"/,
        ' fill="none"',
      )
    case 'html5': // drop shield, keep the "5"
      return recolor(svg)
        .replace(/ fill="currentColor" d="M14\.021 90\.034[^"]*"/, ' fill="none"')
        .replace(/ fill="currentColor" d="M50\.093 92\.344[^"]*"/, ' fill="none"')
    case 'bootstrap5': // drop rounded-square, keep the B
      return recolor(svg).replace(
        / fill="currentColor" d="M11\.031 20\.414[^"]*"/,
        ' fill="none"',
      )
    case 'opencode': // keep the frame only
      return recolor(svg).replace(
        / fill="currentColor" d="M70 80H30V40h40z"/,
        ' fill="none"',
      )
    default:
      return recolor(svg)
  }
}

const StackIcon: FC<StackIconProps> = ({
  name,
  variant = 'light',
  className,
  style,
}) => {
  const svg =
    variant === 'grayscale' ? STACK_ICONS[name].light : STACK_ICONS[name][variant]
  return (
    <span
      className={`stack-icon${className ? ` ${className}` : ''}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: monochrome(name, svg) }}
    />
  )
}

export default StackIcon