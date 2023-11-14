import { RadioGroup } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: '1',
    id: 'radio',
    options: [
      { title: 'RadioGroup1', value: '1' },
      { title: 'RadioGroup2', value: '2' },
      { title: 'RadioGroup3', value: '3' },
    ],
  },
}
