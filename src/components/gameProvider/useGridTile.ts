import { useMemo } from "react"
import useGame from "./useGame"

type Props = {
  row: number
  column: number
}

export default function useGridTile({ row, column }: Props) {
  const [snapshot] = useGame()

  const line = useMemo(() => {
    try {
      return snapshot.context.lines[row][column]
    } catch {
      return null
    }
  }, [snapshot.context.lines])

  const result = useMemo(
    () => ({
      variant:
        line && ["misplaced", "correct"].includes(line.type)
          ? line.type
          : undefined,
      letter: line?.value,
    }),
    [line]
  )

  return result
}
