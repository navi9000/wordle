import { EventObject, createMachine, assign } from "xstate"
import { LetterValue, type Letter } from "../types"
import { MAX_STEPS } from "../config/constants"
import words from "./words.json"

function assertEvent<TEvent extends EventObject, Type extends TEvent["type"]>(
  ev: TEvent,
  type: Type
): asserts ev is Extract<TEvent, { type: Type }> {
  if (ev.type !== type) {
    throw new Error("Unexpected event type")
  }
}

const getInitialContext = () => ({
  word: "",
  lines: [],
  activeLineIndex: 0,
  missedLetters: [],
  hitLetters: [],
  isWon: false,
})

const getRandomWord = () => {
  const index = Math.floor(Math.random() * 1000)
  const selectedWord = words.list[index]
  if (selectedWord) {
    return selectedWord
  }
  return getRandomWord()
}

export const gameMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXoG0AGAXUVAAcA9rFwAXXAPy8QAD0QBGAKwAmEgHYALBw5KOANkW7VAZjm6ANCACe8gBwr1ATi1bVWpUYXr1AX28W0WHiEpARQ6Kg0jAAiUQD6ADIAovT0icycPEgggsJiElKyCA42JF6qCtpyclo2qg4W1gg2hiTNSsp6Shq6Hr7+GDgExGT4YRHUzIkAsgDyAGqJCcmp6dxSOaLiklmFdg2Iqq6lDuWKSroOxUZGfSABg8EjYzS0AKoAQlMAkuxrWRt5bagQrVEpGbSOVR2OQOXRKWr7BC6dQKEgcIzlDi1IzIhQKVS3e5BYahcI0DLrISbfI7RDg9QkOTgjgw8qGdS6cxWRAOIwqQztdpYow2LE2QkDYkhUZk6hsOSZfhUwEFOkcBlMrSshTszmIk4ldR2ZTI9E47QSwJDUjPGYANzAACcJokGCxforssqtqqkUpERU5K08VpdBx8aoDL4-CB8AIIHApETrZTcj7aQgALRcxoOVHq5yFwtKS0PEmUMCp6lAmSIdT+7kIGFglE2Dw9dRVZE+GPJx6kiJVlUZuQ6RkORyXfHhnEafVHJRdZQKYqOdQY0tSki2h2Oofp4F1mwlVQ6dU9DE2ByjxFtjhqbQKEw6npwku9yXW7dk+1OkiwABXTBMDgeB-m9GlDwQJ9dDUM8OWuKFrwbXM5BKM5lAQ090TkTcvx3P8ADN0FwCgAMdStwLTSDa2gnE4K0BDL2Q+dYORQU4U8Rw5AJaMgA */
    initial: "idle",
    types: {
      context: {} as {
        word: string
        lines: Letter[][]
        activeLineIndex: number
        missedLetters: LetterValue[]
        hitLetters: LetterValue[]
        isWon: boolean
      },
      tags: {} as "idle" | "ingame" | "success" | "failure",
      events: {} as
        | {
            type: "START"
          }
        | {
            type: "ADD_LETTER"
            value: LetterValue
          }
        | { type: "REMOVE_LETTER" }
        | { type: "SUBMIT" }
        | { type: "RESTART" },
    },
    context: getInitialContext(),
    states: {
      idle: {
        tags: "idle",
        on: {
          START: {
            target: "ingame",
            actions: "setUpGame",
          },
        },
      },
      ingame: {
        tags: "ingame",
        always: [
          {
            target: "gameOver.success",
            guard: "isWon",
          },
          {
            target: "gameOver.failure",
            guard: "isGameOver",
          },
        ],
        on: {
          ADD_LETTER: {
            guard: "hasRoom",
            actions: "addLetter",
          },
          REMOVE_LETTER: {
            guard: "hasLetters",
            actions: "removeLetter",
          },
          SUBMIT: {
            guard: "isValidEntry",
            actions: ["checkLine", "addNewLine"],
          },
        },
      },
      gameOver: {
        initial: "success",
        states: {
          success: {
            tags: "success",
          },
          failure: {
            tags: "failure",
          },
        },
        on: {
          RESTART: {
            target: "idle",
            actions: "restartGame",
          },
        },
      },
    },
  },
  {
    actions: {
      setUpGame: assign({
        word: ({ context }) => (context.word = getRandomWord().toUpperCase()),
        activeLineIndex: ({ context }) => (context.activeLineIndex = 0),
        lines: ({ context }) => (context.lines = [[]]),
      }),
      addLetter: assign({
        lines: ({ context, event }) => {
          assertEvent(event, "ADD_LETTER")
          const index = context.activeLineIndex
          const newLines = structuredClone(context.lines)
          newLines[index] = newLines[index].concat({
            value: event.value,
            type: "default",
          })
          return newLines
        },
      }),
      removeLetter: assign({
        lines: ({ context }) => {
          const newLines = structuredClone(context.lines)
          newLines[context.activeLineIndex].pop()
          return newLines
        },
      }),
      checkLine: assign(({ context }) => {
        const newContext = structuredClone(context)
        newContext.lines[newContext.activeLineIndex].forEach(
          (letter, index) => {
            const value = letter.value
            const isHit = newContext.word.includes(value)
            const isCorrect = value === newContext.word[index]
            if (isHit && !newContext.hitLetters.includes(value)) {
              newContext.hitLetters.push(value)
            }
            if (!isHit && !newContext.missedLetters.includes(value)) {
              newContext.missedLetters.push(value)
            }
            if (isCorrect) {
              letter.type = "correct"
            }
            if (!isCorrect && isHit) {
              letter.type = "misplaced"
            }
            if (
              newContext.lines[newContext.activeLineIndex]
                .map((letter) => letter.value)
                .join("") === newContext.word
            ) {
              newContext.isWon = true
            }
          }
        )
        return newContext
      }),
      addNewLine: assign({
        lines: ({ context }) => {
          const updatedLines = structuredClone(context.lines)
          updatedLines.push([])
          return updatedLines
        },
        activeLineIndex: ({ context }) => context.activeLineIndex + 1,
      }),
      restartGame: assign(getInitialContext()),
    },
    guards: {
      hasRoom: ({ context: { lines, activeLineIndex, word } }) =>
        lines[activeLineIndex].length < word.length,
      hasLetters: ({ context: { lines, activeLineIndex } }) =>
        lines[activeLineIndex].length > 0,
      isWon: ({ context: { isWon } }) => isWon,
      isGameOver: ({ context: { activeLineIndex } }) =>
        activeLineIndex === MAX_STEPS,
      isValidEntry: ({ context: { lines, activeLineIndex, word } }) =>
        lines[activeLineIndex].length === word.length,
    },
  }
)
