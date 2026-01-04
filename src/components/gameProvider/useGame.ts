import { useContext } from "react"
import { MachineContext } from "./GameProvider"

export default function useGame() {
  const context = useContext(MachineContext)
  if (!context) {
    throw new Error("Out of bound")
  }

  return context
}
