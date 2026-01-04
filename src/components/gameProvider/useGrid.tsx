import { useMemo } from "react"
import useGame from "./useGame"

export default function useGrid() {
  const [snapshot] = useGame()

  const result = useMemo(
    () => ({
      rowLength: snapshot.context.word.length,
    }),
    [snapshot.context.word]
  )

  return result
}
