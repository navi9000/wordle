import { createContext, PropsWithChildren } from "react"
import { useMachine } from "@xstate/react"
import { gameMachine } from "../../state/gameMachine"

export const MachineContext = createContext<
  ReturnType<typeof useMachine> | undefined
>(undefined)

export const GameProvider = ({ children }: PropsWithChildren) => {
  const machine = useMachine(gameMachine)

  return (
    <MachineContext.Provider value={machine}>
      {children}
    </MachineContext.Provider>
  )
}
