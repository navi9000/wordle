import { useMemo } from "react"
import useGame from "./useGame"

export default function useGameStart() {
  const [_, send] = useGame()
  const result = useMemo(
    () => ({
      start: () => send({ type: "START" }),
    }),
    []
  )

  return result
}
