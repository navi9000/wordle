import Row from "./Row"
import type { Meta, StoryObj } from "@storybook/react"

const RowStory = {
  title: "Game/Row",
  component: Row,
  tags: ["autodocs"],
  args: {
    length: 5,
  },
} satisfies Meta<typeof Row>

export default RowStory

type Story = StoryObj<typeof RowStory>

export const Empty: Story = { args: { row: 0 } }

// export const Active: Story = {
//   args: {
//     letters: [
//       { value: "A", type: "default" },
//       { value: "P", type: "default" },
//       { value: "P", type: "default" },
//     ],
//   },
// }

// export const Checked: Story = {
//   args: {
//     letters: [
//       { value: "A", type: "correct" },
//       { value: "P", type: "default" },
//       { value: "P", type: "default" },
//       { value: "L", type: "misplaced" },
//       { value: "E", type: "default" },
//     ],
//   },
// }

// export const Correct: Story = {
//   args: {
//     letters: [
//       { value: "A", type: "correct" },
//       { value: "P", type: "correct" },
//       { value: "P", type: "correct" },
//       { value: "L", type: "correct" },
//       { value: "E", type: "correct" },
//     ],
//   },
// }
