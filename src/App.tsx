import "./App.css"

import { GameProvider } from "./components/gameProvider/GameProvider"
import GameView from "./components/gameView/GameView"

function App() {
  return (
    <GameProvider>
      <GameView />
    </GameProvider>
  )
}

export default App
