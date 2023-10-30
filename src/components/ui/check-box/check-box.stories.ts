import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './check-box'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    id: '1',
    label: 'Check-box',
  },
}
