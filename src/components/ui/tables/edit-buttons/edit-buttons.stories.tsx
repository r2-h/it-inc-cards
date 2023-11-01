import { EditButtons } from '@/components/ui/tables/edit-buttons/edit-buttons'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: EditButtons,
  tags: ['autodocs'],
  title: 'Components/EditButtons',
} satisfies Meta<typeof EditButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
