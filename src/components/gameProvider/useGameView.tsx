import { useMemo } from "react"
import useGame from "./useGame"

export default function useGameView() {
  const [snapshot] = useGame()

  const result = useMemo(
    () => ({
      isGameStart: snapshot.hasTag("idle"),
      isInGame: snapshot.hasTag("ingame"),
      isGameEnd: snapshot.hasTag("success") || snapshot.hasTag("failure"),
    }),
    [snapshot.tags]
  )

  return result
}
