import countries from '../data/countries.json'

export const DIFFICULTY = {
  easy: { label: 'Easy', guesses: 6, capitalHint: true },
  medium: { label: 'Medium', guesses: 5, capitalHint: false },
  hard: { label: 'Hard', guesses: 4, capitalHint: false },
}

const MIN_BORDERS = 2
const MAX_BORDERS = 6

export const byCode = Object.fromEntries(countries.map((c) => [c.code, c]))

const candidates = countries
  .filter((c) => {
    const n = c.borders.length
    if (n < MIN_BORDERS || n > MAX_BORDERS) return false
    if (!c.area || !c.capital || !c.population) return false
    return c.borders.every((code) => byCode[code] && byCode[code].area)
  })
  .sort((a, b) => b.population - a.population)

const tierSize = Math.floor(candidates.length / 3)
const POOLS = {
  easy: candidates.slice(0, tierSize),
  medium: candidates.slice(tierSize, tierSize * 2),
  hard: candidates.slice(tierSize * 2),
}

export const allOptions = [...countries].sort((a, b) => a.name.localeCompare(b.name))

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export function newRound(difficulty) {
  const target = pick(POOLS[difficulty])
  const answer = target.borders
    .map((code) => byCode[code])
    .sort((a, b) => b.area - a.area)
  return {
    target,
    answer,
    answerCodes: answer.map((c) => c.code),
    slots: answer.length,
  }
}

export function scoreGuess(guessCodes, answerCodes) {
  const result = new Array(guessCodes.length).fill('red')
  const remaining = {}
  answerCodes.forEach((code) => {
    remaining[code] = (remaining[code] || 0) + 1
  })

  guessCodes.forEach((code, i) => {
    if (code === answerCodes[i]) {
      result[i] = 'green'
      remaining[code] -= 1
    }
  })

  guessCodes.forEach((code, i) => {
    if (result[i] === 'green') return
    if (remaining[code] > 0) {
      result[i] = 'yellow'
      remaining[code] -= 1
    }
  })

  return result
}

export function isWin(result) {
  return result.every((r) => r === 'green')
}
