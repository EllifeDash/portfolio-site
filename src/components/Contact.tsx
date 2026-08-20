import { SiGithub, SiBehance, SiInstagram, SiFacebook } from 'react-icons/si'
import type { IconType } from 'react-icons'
import { FaLinkedin } from 'react-icons/fa6'
import Section from './ui/Section'
import { useUnderline } from '../hooks/useUnderline'
import profile from '../data/profile.json'

const EMAIL = profile.contact.email
const PHONES = profile.contact.phone
const WHATSAPP = 'https://wa.me/' + PHONES[0].replace(/\D/g, '')
const LINKS = profile.links

const SOCIALS: { label: string; href: string; Icon: IconType; color: string; darkWhite?: boolean }[] =
  [
    { label: 'LinkedIn', href: LINKS.linkedin, Icon: FaLinkedin, color: '#0A66C2' },
    { label: 'GitHub', href: LINKS.github, Icon: SiGithub, color: '#181717', darkWhite: true },
    { label: 'Behance', href: LINKS.behance, Icon: SiBehance, color: '#1769FF' },
    { label: 'Instagram', href: LINKS.instagram, Icon: SiInstagram, color: '#E4405F' },
    { label: 'Facebook', href: LINKS.facebook, Icon: SiFacebook, color: '#1877F2' },
  ]

export const Contact: React.FC = () => {
  const underlineRef = useUnderline<HTMLParagraphElement>()

  return (
    <Section id="contact" className="contact">
      <div className="contact__inner">
        <p className="contact__eyebrow underline-anim" ref={underlineRef}>
          Contact
        </p>
        <h2 className="contact__name">Abdullah Tayyab</h2>
        <p className="contact__role">Full Stack Developer</p>
        <span className="contact__sig" aria-hidden="true">
          EllifeDash
        </span>

        <div className="contact__actions">
          <a
            className="contact__choice contact__choice--email"
            href={`mailto:${EMAIL}`}
          >
            Email me
          </a>
          <span className="contact__slash" aria-hidden="true">
            /
          </span>
          <a
            className="contact__choice contact__choice--whatsapp"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>

        <ul className="contact__social">
          {SOCIALS.map(({ label, href, Icon, color, darkWhite }) => (
            <li key={label}>
              <a
                className="contact__social-link"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{ '--icon-brand': color } as React.CSSProperties}
                data-dark-hover={darkWhite ? '1' : undefined}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="contact__copy">
        © {new Date().getFullYear()} Abdullah Tayyab · Made with <span className="contact__heart" aria-hidden="true">♥</span> React by{' '}
        <span className="contact__signature">EllifeDash</span>
      </p>
    </Section>
  )
}