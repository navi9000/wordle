import Grid from "./Grid"
import type { Meta, StoryObj } from "@storybook/react"

const GridStory = {
  title: "Game/Grid",
  component: Grid,
} satisfies Meta<typeof Grid>

export default GridStory

type Story = StoryObj<typeof GridStory>

export const Empty: Story = {}
