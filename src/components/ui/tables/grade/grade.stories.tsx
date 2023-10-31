import { Grade } from '@/components/ui/tables/grade/grade'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Grade,
  tags: ['autodocs'],
  title: 'Components/Grade',
} satisfies Meta<typeof Grade>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    stars: 3,
  },
}
