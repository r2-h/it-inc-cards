import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxDemo } from './check-box'

const meta = {
  component: CheckboxDemo,
  tags: ['autodocs'],
  title: 'Components/CheckboxDemo',
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '1',
  },
}

export const WithLabel: Story = {
  args: {
    disabled: false,
    id: '1',
    label: 'Check-box',
  },
}
