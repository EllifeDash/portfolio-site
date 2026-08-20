import Section from './ui/Section'
import IconMarquee from './ui/IconMarquee'
import type { MarqueeItem } from './ui/IconMarquee'
import StackIcon from './ui/StackIcon'
import type { StackIconName } from '../data/stackIcons'
import { useTheme } from '../hooks/useTheme'
import { useUnderline } from '../hooks/useUnderline'

type Tile = {
  icon: StackIconName
  color: string
}

const TILES: Record<string, Tile> = {
  React: { icon: 'react', color: 'blue' },
  'Next.js': { icon: 'nextjs', color: 'indigo' },
  HTML5: { icon: 'html5', color: 'orange' },
  JavaScript: { icon: 'js', color: 'orange' },
  Bootstrap: { icon: 'bootstrap5', color: 'purple' },
  'Tailwind CSS': { icon: 'tailwindcss', color: 'green' },
  'Node.js': { icon: 'nodejs2', color: 'green' },
  npm: { icon: 'npm', color: 'red' },
  MongoDB: { icon: 'mongodb', color: 'green' },
  Supabase: { icon: 'supabase', color: 'green' },
  SQLite: { icon: 'sqlite', color: 'blue' },
  Vercel: { icon: 'vercel', color: 'indigo' },
  GitHub: { icon: 'github', color: 'indigo' },
  n8n: { icon: 'n8n', color: 'red' },
  'VS Code': { icon: 'vscode', color: 'blue' },
  OpenCode: { icon: 'opencode', color: 'purple' },
  PWA: { icon: 'pwa', color: 'red' },
}

const ROW_TOP = [
  'React',
  'Next.js',
  'HTML5',
  'Tailwind CSS',
  'npm',
  'Bootstrap',
  'MongoDB',
  'VS Code',
  'Supabase',
]

const ROW_BOTTOM = [
  'JavaScript',
  'Node.js',
  'n8n',
  'OpenCode',
  'Vercel',
  'SQLite',
  'GitHub',
  'PWA',
]

export const TechStack: React.FC = () => {
  const underlineRef = useUnderline<HTMLParagraphElement>()
  const theme = useTheme()
  const variant = theme === 'dark' ? 'light' : 'dark'

  const buildItems = (names: string[]): MarqueeItem[] =>
    names.flatMap((name) => {
      const tile = TILES[name]
      if (!tile) return []
      return [
        {
          icon: (
            <StackIcon
              name={tile.icon}
              variant={variant}
              className="w-full h-full"
            />
          ),
          color: tile.color,
          label: name,
        },
      ]
    })

  const topRow = buildItems(ROW_TOP)
  const bottomRow = buildItems(ROW_BOTTOM)

  return (
    <Section id="tech" className="tech">
      <div className="tech__inner">
        <p className="tech__eyebrow underline-anim" ref={underlineRef}>
          Tech Stack
        </p>
        <h2 className="tech__title">Tools I build with</h2>
        <div className="tech__glass">
          <IconMarquee items={topRow} direction="right" duration={40} />
          <IconMarquee items={bottomRow} direction="left" duration={40} />
        </div>
      </div>
    </Section>
  )
}