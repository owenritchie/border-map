import Flag from './Flag'

function formatArea(area) {
  return `${Math.round(area).toLocaleString('en-US')} km²`
}

export default function EndScreen({
  outcome,
  round,
  guessesUsed,
  maxGuesses,
  onPlayAgain,
  onChangeLevel,
}) {
  const won = outcome === 'won'
  return (
    <div className="overlay">
      <div className="endcard">
        <p className={`endcard__verdict endcard__verdict--${outcome}`}>
          {won ? 'Solved' : 'Out of guesses'}
        </p>
        <p className="endcard__summary">
          {won
            ? `You mapped ${round.target.name} in ${guessesUsed} of ${maxGuesses} guesses.`
            : `The neighbours of ${round.target.name}, largest to smallest:`}
        </p>

        <ol className="answer">
          {round.answer.map((c, i) => (
            <li key={c.code} className="answer__row">
              <span className="answer__rank">{i + 1}</span>
              <Flag country={c} className="answer__flag" />
              <span className="answer__name">{c.name}</span>
              <span className="answer__area">{formatArea(c.area)}</span>
            </li>
          ))}
        </ol>

        <div className="endcard__actions">
          <button className="btn btn--primary" onClick={onPlayAgain}>
            Play again
          </button>
          <button className="btn btn--ghost" onClick={onChangeLevel}>
            Change level
          </button>
        </div>
      </div>
    </div>
  )
}
