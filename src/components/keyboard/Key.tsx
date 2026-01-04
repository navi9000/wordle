import { FC } from "react"
import { LetterValue } from "../../types"
import { AiOutlineEnter } from "react-icons/ai"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import cn from "classnames"
import styles from "./Key.module.css"
import useGame from "../gameProvider/useGame"

interface LetterProps {
  letter: LetterValue
  type?: "letter"
  disabled?: boolean
}

interface CommandProps {
  type: "enter" | "backspace"
}

type Props = LetterProps | CommandProps

export const Key: FC<Props & { callback: () => void }> = (props) => {
  const Component = (() => {
    switch (props.type) {
      case "letter":
      case undefined:
        return <span>{props.letter}</span>
      case "enter":
        return <AiOutlineEnter size="1rem" />
      case "backspace":
        return <MdOutlineKeyboardBackspace />
      default:
        const _exhaustiveCheck: never = props
        console.warn({ _exhaustiveCheck })
    }
  })()
  return (
    <div
      className={cn(styles.key, {
        [styles[`key_${props.type}`]]: props.type,
        [styles.key_disabled]: "disabled" in props && props.disabled,
      })}
      onClick={props.callback}
    >
      {Component}
    </div>
  )
}

const KeyWithContext: FC<Props> = (props) => {
  const [{ context }, send] = useGame()

  const newProps = (() => {
    const result = { ...props } as any
    if ("letter" in props) {
      result.callback = () => send({ type: "ADD_LETTER", value: props.letter })
      result.disabled = context.missedLetters.includes(props.letter)
    }
    if (props.type === "enter") {
      result.callback = () => send({ type: "SUBMIT" })
    }
    if (props.type === "backspace") {
      result.callback = () => send({ type: "REMOVE_LETTER" })
    }
    return result
  })()

  return <Key {...newProps} />
}

export default KeyWithContext
