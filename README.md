# Border Map

A country border memory game. You are given a country and its flag, and you guess
every country that shares a land border with it, ordered from largest to smallest by
area. Feedback is given similar to Wordle:

- green: right country, right position
- yellow: a neighbour, but in the wrong position
- red: not a neighbour

Past guesses are hidden, so you have to remember them. That is the memory part.

## Levels

Levels are set by population. The countries that can appear (all that have 2 to 6 land
neighbours) are split into 3 population tiers.

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
