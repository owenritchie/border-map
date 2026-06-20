import Logo from './Logo'
import { DIFFICULTY } from '../lib/game'

const LEVELS = [
  {
    key: 'easy',
    note: 'Well known countries. Capitals are revealed for the last three guesses.',
  },
  {
    key: 'medium',
    note: 'Less familiar countries. No capital hints.',
  },
  {
    key: 'hard',
    note: 'Obscure countries and fewer guesses.',
  },
]

export default function StartScreen({ onStart }) {
  return (
    <main className="screen screen--start">
      <Logo size="large" />

      <div className="intro">
        <p>
          You get a country and its flag. Name every country that shares a land border
          with it, ordered from largest to smallest by area.
        </p>
        <ul className="intro__legend">
          <li>
            <span className="chip chip--green" /> Right country, right position.
          </li>
          <li>
            <span className="chip chip--yellow" /> A neighbour, but in the wrong position.
          </li>
          <li>
            <span className="chip chip--red" /> Not a neighbour.
          </li>
        </ul>
        <p className="intro__memory">
          Past guesses are hidden, so you have memorize their place.
        </p>
      </div>

      <div className="levels">
        <h2 className="levels__title">Pick a level</h2>
        <div className="levels__grid">
          {LEVELS.map(({ key, note }) => (
            <button key={key} className="level" onClick={() => onStart(key)}>
              <span className="level__name">{DIFFICULTY[key].label}</span>
              <span className="level__guesses">{DIFFICULTY[key].guesses} guesses</span>
              <span className="level__note">{note}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
