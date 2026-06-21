import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import Footer from './components/Footer'

export default function App() {
  const [game, setGame] = useState(null)

  return (
    <div className="app">
      {game ? (
        <GameScreen
          key={`${game.difficulty}-${game.region}`}
          difficulty={game.difficulty}
          region={game.region}
          onChangeLevel={() => setGame(null)}
        />
      ) : (
        <StartScreen onStart={(difficulty, region) => setGame({ difficulty, region })} />
      )}
      <Footer />
    </div>
  )
}
