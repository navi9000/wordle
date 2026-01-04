import { FC, PropsWithChildren, useMemo } from "react"
import cn from "classnames"
import styles from "./Tile.module.css"
import useGridTile from "../gameProvider/useGridTile"

type Props = {
  variant?: "default" | "misplaced" | "correct"
}

type ContextProps = {
  row: number
  column: number
}

export const Tile: FC<PropsWithChildren<Props>> = ({
  variant = "default",
  children,
}) => {
  return (
    <div
      className={cn(styles.tile, {
        [styles[`tile_${variant}`]]: variant,
      })}
    >
      {children}
    </div>
  )
}

const TileWithContext: FC<ContextProps> = ({ row, column }) => {
  const { variant, letter } = useGridTile({ row, column })

  const result = useMemo(() => {
    return <Tile variant={variant}>{letter}</Tile>
  }, [variant, letter])

  return result
}

export default TileWithContext
