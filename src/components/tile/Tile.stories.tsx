import type { Meta, StoryObj } from "@storybook/react"

import Tile from "./Tile"

const TileStory = {
  title: "Game/Tile",
  component: Tile,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      type: "string",
      name: "Tile type",
    },
  },
  args: {
    children: "A",
  },
} satisfies Meta<typeof Tile>

export default TileStory

type Story = StoryObj<typeof TileStory>

export const Default: Story = {}

export const Misplaced: Story = {
  args: {
    variant: "misplaced",
  },
}

export const Correct: Story = {
  args: {
    variant: "correct",
  },
}
