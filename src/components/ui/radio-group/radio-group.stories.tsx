import { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from './radio-group'

const meta = {
  component: RadioGroupDemo,
  tags: ['autodocs'],
  title: 'Components/RadioGroupDemo',
} satisfies Meta<typeof RadioGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'RadioGroup',
    values: [
      { disable: false, title: 'RadioGroup1' },
      { disable: false, title: 'RadioGroup2' },
      { disable: false, title: 'RadioGroup3' },
    ],
  },
}
