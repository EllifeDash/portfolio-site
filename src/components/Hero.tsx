import Section from './ui/Section';
import Button from './ui/Button';
import Typewriter from './ui/Typewriter';
import GradientWaves from './GradientWaves';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../hooks/useTheme';
import profile from '../data/profile.json';

const GITHUB_URL = 'https://github.com/EllifeDash';

const TYPE_WORDS = [
  'Website Building',
  'Software Development',
  'Offline-First Apps',
  'Clinic Management Systems',
  'Chrome Extensions',
  'Workflow Automation',
];

const WAVE_COLORS = {
  dark: {
    horizonColor: '#0303b4',
    waveColor: '#EF4444',
    crestColor: '#7353e0',
    speed: 0.55,
    amplitude: 2.5,
    waveScale: 0.6,
    waveRatio: 0.9,
    swell: 35,
    turbulence: 55.5,
    tilt: 1.3,
    zoom: 0.95,
    height: 5.5,
    fogDepth: 18,
    detail: 'medium' as const,
    brightness: 1,
    opacity: 1,
    mouseInteraction: true,
    parallaxStrength: 0.49,
    grain: true,
    grainIntensity: 0.05,
  },
  light: {
    horizonColor: '#010131',
    waveColor: '#EF4444',
    crestColor: '#5368e0',
    speed: 0.55,
    amplitude: 2.5,
    waveScale: 0.6,
    waveRatio: 0.9,
    swell: 35,
    turbulence: 55.5,
    tilt: 1.3,
    zoom: 0.95,
    height: 5.5,
    fogDepth: 18,
    detail: 'medium' as const,
    brightness: 1.2,
    opacity: 1,
    mouseInteraction: true,
    parallaxStrength: 0.49,
    grain: true,
    grainIntensity: 0.05,
  },
};

export const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const theme = useTheme();
  const waveColors = theme === 'light' ? WAVE_COLORS.light : WAVE_COLORS.dark;

  return (
    <Section id="hero" className="hero" fullBleed>
      <div className="hero__bg" aria-hidden="true">
        {reducedMotion ? <div className="hero__static" /> : <GradientWaves {...waveColors} />}
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">
          <Typewriter words={TYPE_WORDS} />
        </p>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <Button href="#projects" variant="primary">
            View Work
          </Button>
          <Button href={GITHUB_URL} variant="secondary" external>
            GitHub
          </Button>
        </div>
      </div>
    </Section>
  );
};
