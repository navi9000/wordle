import { useMemo } from "react"
import useGame from "./useGame"

export default function useGameEnd() {
  const [snapshot, send] = useGame()

  const result = useMemo(
    () => ({
      restart: () => send({ type: "RESTART" }),
      gameResult: snapshot.hasTag("success")
        ? "You won"
        : snapshot.hasTag("failure")
        ? "You lost"
        : "",
    }),
    [snapshot.tags]
  )

  return result
}
