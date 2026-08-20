import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TypewriterProps {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  holdMs?: number
  pauseMs?: number
}

const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  holdMs = 1600,
  pauseMs = 400,
}) => {
  const reducedMotion = useReducedMotion()

  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0])
      return
    }

    const word = words[index % words.length]
    let timer: number

    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text === '') {
      timer = window.setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      }, pauseMs)
    } else {
      timer = window.setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? word.slice(0, prev.length - 1)
              : word.slice(0, prev.length + 1),
          )
        },
        deleting ? deleteSpeed : typeSpeed,
      )
    }

    return () => window.clearTimeout(timer)
  }, [text, deleting, index, words, reducedMotion, typeSpeed, deleteSpeed, holdMs, pauseMs])

  const longest = words.reduce((max, w) => Math.max(max, w.length), 0)

  return (
    <span
      className="typewriter"
      style={{ minWidth: `${longest * 0.78}em` }}
    >
      <span className="typewriter__text">{text}</span>
      <span className="typewriter__caret" aria-hidden="true" />
    </span>
  )
}

export default Typewriter