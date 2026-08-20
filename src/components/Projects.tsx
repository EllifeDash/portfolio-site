import { SiGithub } from 'react-icons/si'
import Section from './ui/Section'
import Button from './ui/Button'
import Badge from './ui/Badge'
import { useUnderline } from '../hooks/useUnderline'
import profile from '../data/profile.json'

const GITHUB = profile.links.github

const TYPE_LABELS: Record<string, string> = {
  Aafiyat: 'Desktop App · Clinic SaaS',
  'Nankana Home Care': 'Web Ecosystem · PWA',
}

const FEATURED = ['Aafiyat', 'Nankana Home Care']

interface DevProject {
  name: string
  description: string
  stack: string[]
  status: string
  site?: string
}

const PROJECT_BRAND: Record<string, string> = {
  Aafiyat: '#DF722F',
  'Nankana Home Care': '#00B4D8',
}

const devProjects = profile.profiles.find((p) => p.type === 'developer')?.projects ?? []
const projects: DevProject[] = devProjects.filter((p) => FEATURED.includes(p.name))

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const Projects: React.FC = () => {
  const underlineRef = useUnderline<HTMLParagraphElement>()

  return (
    <Section id="projects" className="projects">
      <div className="projects__inner">
        <p className="projects__eyebrow underline-anim" ref={underlineRef}>
          Selected Work
        </p>
        <h2 className="projects__title">Recent builds</h2>

        <div className="projects__grid">
          {projects.map((p) => {
            const brand = PROJECT_BRAND[p.name] ?? 'var(--primary)'
            const site = p.site
            return (
              <article
                className="project"
                key={p.name}
                style={{ '--project-brand': brand } as React.CSSProperties}
              >
                <div className="project__head">
                  <span className="project__type">{TYPE_LABELS[p.name]}</span>
                  <Badge>{capitalize(p.status)}</Badge>
                </div>
                <h3 className="project__name">{p.name}</h3>
                <p className="project__desc">{p.description}</p>
                <ul className="project__stack">
                  {p.stack.map((t) => (
                    <li className="project__tag" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="project__actions">
                  {site ? (
                    <Button
                      href={site}
                      variant="primary"
                      external
                      style={{
                        background: brand,
                        color: '#15224A',
                      }}
                    >
                      Visit Site
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="btn--disabled"
                      disabled
                      title="Launching soon"
                      style={{ background: brand, color: '#15224A' }}
                    >
                      Coming Soon
                    </Button>
                  )}
                  <Button href={GITHUB} variant="secondary" external>
                    Details
                  </Button>
                </div>
              </article>
            )
          })}

          <article className="project project--more">
            <a
              className="project__more-card"
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              style={{ '--icon-brand': '#181717' } as React.CSSProperties}
              data-dark-hover="1"
            >
              <span className="project__more-icon" aria-hidden="true">
                <SiGithub />
              </span>
              <h3 className="project__more-title">More on GitHub</h3>
              <p className="project__more-text">
                More experiments, tools, and case studies live on my GitHub.
              </p>
              <span className="project__more-cta">Visit GitHub →</span>
            </a>
          </article>
        </div>
      </div>
    </Section>
  )
}
