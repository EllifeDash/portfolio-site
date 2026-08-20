import Section from './ui/Section'
import ProfileCard from './ProfileCard'
import { useUnderline } from '../hooks/useUnderline'

const ABOUT_COPY =
  'Full-Stack Web Developer specializing in MERN stack development, offline-first applications, ' +
  'UI/UX design, and browser automation. I design and build resilient, high-performance web software ' +
  'engineered for speed and reliability. From React front-ends to automated back-end workflows, ' +
  'I create intuitive tools that streamline complex processes.'

const STATS = [
  { value: '2+', label: 'Years Full-Stack' },
  { value: '3', label: 'Products Shipped' },
  { value: 'MERN', label: 'Core Stack' },
]

export const About: React.FC = () => {
  const underlineRef = useUnderline<HTMLParagraphElement>()
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="about" className="about">
      <div className="about__inner">
        <ProfileCard
          className="about__card"
          avatarUrl="/profile-card.png"
          name="Abdullah Tayyab"
          title="Full-Stack Web Developer"
          handle="ellifedash"
          status="Open to Work"
          contactText="Contact Me"
          height="min(58svh, 460px)"
          maxHeight="460px"
          onContactClick={scrollToContact}
        />
        <div className="about__body">
          <p className="about__eyebrow underline-anim" ref={underlineRef}>
            About
          </p>
          <h2 className="about__title">Building practical software for real-world problems</h2>
          <p className="about__text">{ABOUT_COPY}</p>
          <div className="about__stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}