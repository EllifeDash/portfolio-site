import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { TechStack } from './components/TechStack'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { SmoothScroll } from './components/SmoothScroll'
import { Preloader } from './components/ui/Preloader'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Nav />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
    </>
  )
}
