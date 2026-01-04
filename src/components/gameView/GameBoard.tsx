import Grid from "../grid/Grid"
import { Keyboard } from "../keyboard/Keyboard"
import styles from "./GameBoard.module.css"

const GameBoard = () => {
  return (
    <section className={styles.board}>
      <Grid />
      <Keyboard />
    </section>
  )
}

export default GameBoard
