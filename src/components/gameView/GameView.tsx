import useGameView from "../gameProvider/useGameView"
import GameStart from "./GameStart"
import { lazy, Suspense } from "react"

const GameBoard = lazy(() => import("./GameBoard"))
const GameEnd = lazy(() => import("./GameEnd"))

const GameView = () => {
  const { isGameStart, isInGame, isGameEnd } = useGameView()

  return (
    <main>
      {isGameStart && <GameStart />}
      <Suspense>
        {isInGame && <GameBoard />}
        {isGameEnd && <GameEnd />}
      </Suspense>
    </main>
  )
}

export default GameView
