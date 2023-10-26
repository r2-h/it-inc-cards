import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radio-group'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'RadioGroup',
    id: 'd',
    options: [
      { disable: false, title: 'RadioGroup1' },
      { disable: false, title: 'RadioGroup2' },
      { disable: false, title: 'RadioGroup3' },
    ],
  },
}
