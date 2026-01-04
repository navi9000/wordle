import useGameEnd from "../gameProvider/useGameEnd"

const GameEnd = () => {
  const { restart, gameResult } = useGameEnd()
  return (
    <div>
      <h1>{gameResult}</h1>
      <button onClick={restart}>Back to the main screen</button>
    </div>
  )
}

export default GameEnd
