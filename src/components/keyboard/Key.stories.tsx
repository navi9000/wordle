import type { Meta, StoryObj } from "@storybook/react"
import { Key } from "./Key"

const KeyStory = {
  title: "Game/Key",
  component: Key,
  argTypes: {
    type: {
      control: "select",
      options: ["letter", "enter", "backspace"],
    },
  },
} satisfies Meta<typeof Key>

export default KeyStory

type Story = StoryObj<typeof KeyStory>

export const Letter: Story = {
  args: {
    letter: "A",
    type: "letter",
  },
}

export const Disabled: Story = {
  args: {
    letter: "A",
    disabled: true,
  },
}

export const Enter: Story = {
  args: {
    type: "enter",
  },
}

export const Backspace: Story = {
  args: {
    type: "backspace",
  },
}
