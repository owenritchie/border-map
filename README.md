# Border Map

A country border memory game. You are given a country and its flag, and you guess
every country that shares a land border with it, ordered from largest to smallest by
area. Feedback is Wordle style:

- green: right country, right position
- yellow: a neighbour, but in the wrong position
- red: not a neighbour

Past guesses are hidden, so you have to remember them. That is the memory part.

## Levels

Levels are set by population. The countries that can appear (two to six land
neighbours, full data available) are split into three population tiers.

| Level  | Countries        | Guesses | Hint                                  |
| ------ | ---------------- | ------- | ------------------------------------- |
| Easy   | most populated   | 6       | capitals shown for the last 3 guesses |
| Medium | mid populated    | 5       | none                                  |
| Hard   | least populated  | 4       | none                                  |

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

Built with React and Vite. Styling is plain CSS in `src/styles.css`.

## Data

The plan was to read borders and flags from restcountries.com at runtime. That public
API was retired during development and now requires a personal API key, which cannot be
shipped safely in a client side app. To keep the game self contained and testable
without a key, the same underlying data is bundled in `src/data/countries.json`,
generated from:

- borders, area, capital, ISO codes: the `mledoze/countries` dataset, which is the
  source data restcountries itself is built from
- population: the World Bank population indicator (`SP.POP.TOTL`)
- flag images: the free flag CDN at `flagcdn.com`, by ISO code, with the dataset's
  emoji flag as a fallback

## Structure

```
src/
  App.jsx                 screen routing (start <-> game)
  lib/game.js             round setup, population tiers, area ordering, scoring
  data/countries.json     bundled country data
  components/
    StartScreen.jsx       level selection
    GameScreen.jsx        the round, guessing and reveal
    CountrySelect.jsx     searchable country dropdown (one per border)
    EndScreen.jsx         result and the revealed answer
    Logo.jsx, Flag.jsx
  styles.css
```
