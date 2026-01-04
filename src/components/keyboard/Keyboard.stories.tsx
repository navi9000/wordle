import type { Meta, StoryObj } from "@storybook/react"
import { Keyboard } from "./Keyboard"

const KeyboardStory = {
  title: "Game/Keyboard",
  component: Keyboard,
  argTypes: {
    type: {
      control: "select",
      options: ["letter", "enter", "backspace"],
    },
  },
} satisfies Meta<typeof Keyboard>

export default KeyboardStory

type Story = StoryObj<typeof KeyboardStory>

export const Initial: Story = {}
