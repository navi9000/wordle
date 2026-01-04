import useGameStart from "../gameProvider/useGameStart"

const GameStart = () => {
  const { start } = useGameStart()

  return <button onClick={start}>Start Game</button>
}

export default GameStart
