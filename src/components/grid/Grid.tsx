import { FC, useMemo } from "react"
import { MAX_STEPS } from "../../config/constants"
import Row from "./Row"
import styles from "./Grid.module.css"
import useGrid from "../gameProvider/useGrid"

const Grid: FC<{}> = () => {
  const { rowLength } = useGrid()

  const result = useMemo(
    () => (
      <div className={styles.grid}>
        {Array(MAX_STEPS)
          .fill(1)
          .map((_, index) => (
            <Row key={index} row={index} length={rowLength} />
          ))}
      </div>
    ),
    [rowLength]
  )

  return result
}

export default Grid
