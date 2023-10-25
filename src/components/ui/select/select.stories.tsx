import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    disabled: false,
    label: 'Select-box',
    onChangeValue: () => {},
    options: [
      { id: '1', value: 'Select-box1' },
      { id: '2', value: 'Select-box2' },
      { id: '3', value: 'Select-box3' },
    ],
    placeholder: 'Select-box',
  },
}
