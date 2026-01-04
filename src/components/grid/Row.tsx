import { FC } from "react"
import Tile from "../tile/Tile"
import styles from "./Row.module.css"

type Props = {
  length?: number
  row: number
}

const Row: FC<Props> = ({ length = 5, row }) => {
  return (
    <div className={styles.row}>
      {Array(length)
        .fill(1)
        .map((_, index) => (
          <Tile key={index} row={row} column={index} />
        ))}
    </div>
  )
}

export default Row
