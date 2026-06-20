import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import Footer from './components/Footer'

export default function App() {
  const [difficulty, setDifficulty] = useState(null)

  return (
    <div className="app">
      {difficulty ? (
        <GameScreen
          key={difficulty}
          difficulty={difficulty}
          onChangeLevel={() => setDifficulty(null)}
        />
      ) : (
        <StartScreen onStart={setDifficulty} />
      )}
      <Footer />
    </div>
  )
}
