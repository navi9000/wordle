const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const

export type LetterType = "default" | "misplaced" | "correct"

export type LetterValue = (typeof alphabet)[number]

export type Letter = {
  value: LetterValue
  type: LetterType
}
