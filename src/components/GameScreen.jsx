import { useMemo, useState } from 'react'
import Logo from './Logo'
import Flag from './Flag'
import CountrySelect from './CountrySelect'
import EndScreen from './EndScreen'
import { DIFFICULTY, allOptions, newRound, scoreGuess, isWin } from '../lib/game'

export default function GameScreen({ difficulty, onChangeLevel }) {
  const maxGuesses = DIFFICULTY[difficulty].guesses
  const [round, setRound] = useState(() => newRound(difficulty))
  const [guess, setGuess] = useState(() => Array(round.slots).fill(null))
  const [guessesUsed, setGuessesUsed] = useState(0)
  const [revealed, setRevealed] = useState(null)
  const [phase, setPhase] = useState('guessing')

  const remaining = maxGuesses - guessesUsed
  const showCapitalHint =
    DIFFICULTY[difficulty].capitalHint && phase === 'guessing' && remaining <= 3
  const allFilled = guess.every((g) => g !== null)

  const sortedCapitals = useMemo(
    () =>
      round.answer
        .map((c) => c.capital)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [round]
  )

  function setSlot(i, code) {
    setGuess((g) => {
      const next = [...g]
      next[i] = code
      return next
    })
  }

  function submit() {
    const result = scoreGuess(guess, round.answerCodes)
    const used = guessesUsed + 1
    setRevealed(result)
    setGuessesUsed(used)
    if (isWin(result)) setPhase('won')
    else if (used >= maxGuesses) setPhase('lost')
    else setPhase('revealed')
  }

  function nextGuess() {
    setGuess(Array(round.slots).fill(null))
    setRevealed(null)
    setPhase('guessing')
  }

  function playAgain() {
    const r = newRound(difficulty)
    setRound(r)
    setGuess(Array(r.slots).fill(null))
    setGuessesUsed(0)
    setRevealed(null)
    setPhase('guessing')
  }

  const correctCount = revealed ? revealed.filter((r) => r === 'green').length : 0

  return (
    <main className="screen screen--game">
      <header className="topbar">
        <button className="link" onClick={onChangeLevel}>
          Change level
        </button>
        <Logo size="small" />
        <span className="topbar__level">{DIFFICULTY[difficulty].label}</span>
      </header>

      <section className="target">
        <Flag country={round.target} className="target__flag" />
        <div className="target__text">
          <span className="target__label">Name the neighbours of</span>
          <span className="target__name">{round.target.name}</span>
          <span className="target__hint">
            {round.slots} land borders, ordered largest to smallest by area
          </span>
        </div>
      </section>

      <div className="guesses" aria-label={`Guess ${Math.min(guessesUsed + 1, maxGuesses)} of ${maxGuesses}`}>
        {Array.from({ length: maxGuesses }).map((_, i) => (
          <span
            key={i}
            className={`pip${i < guessesUsed ? ' pip--used' : ''}${
              i === guessesUsed && phase === 'guessing' ? ' pip--current' : ''
            }`}
          />
        ))}
      </div>

      <section className={`board board--${round.slots}`}>
        {guess.map((code, i) => (
          <CountrySelect
            key={i}
            index={i}
            value={code}
            onChange={(c) => setSlot(i, c)}
            options={allOptions}
            state={revealed ? revealed[i] : null}
            disabled={phase !== 'guessing'}
          />
        ))}
      </section>

      {showCapitalHint && (
        <p className="capital-hint">
          <span className="capital-hint__label">Capitals of the neighbours</span>
          {sortedCapitals.join(', ')}
        </p>
      )}

      <div className="actions">
        {phase === 'guessing' && (
          <button className="btn btn--primary" onClick={submit} disabled={!allFilled}>
            {allFilled ? 'Submit guess' : 'Fill every slot to submit'}
          </button>
        )}
        {phase === 'revealed' && (
          <>
            <p className="result-line">
              {correctCount} of {round.slots} in the right place. {remaining} guess
              {remaining === 1 ? '' : 'es'} left.
            </p>
            <button className="btn btn--primary" onClick={nextGuess}>
              Continue
            </button>
          </>
        )}
      </div>

      {(phase === 'won' || phase === 'lost') && (
        <EndScreen
          outcome={phase}
          round={round}
          guessesUsed={guessesUsed}
          maxGuesses={maxGuesses}
          onPlayAgain={playAgain}
          onChangeLevel={onChangeLevel}
        />
      )}
    </main>
  )
}
