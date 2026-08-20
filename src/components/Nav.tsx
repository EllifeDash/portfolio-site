import { useEffect, useState } from 'react'
import { IoHome } from 'react-icons/io5'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'tech', label: 'Tech' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = ['hero', ...LINKS.map((l) => l.id)]

export const Nav: React.FC = () => {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 2) {
        current = SECTION_IDS[SECTION_IDS.length - 1]
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const isHome = active === 'hero'

  return (
    <nav className="nav" aria-label="Primary">
      <a
        className={`nav__home${isHome ? ' nav__home--active' : ''}`}
        href="#hero"
        aria-label="Back to top"
        aria-current={isHome ? 'true' : undefined}
      >
        <IoHome size={18} aria-hidden="true" />
      </a>
      <ul className="nav__list">
        {LINKS.map((l) => (
          <li key={l.id}>
            <a
              className={`nav__link${active === l.id ? ' nav__link--active' : ''}`}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}