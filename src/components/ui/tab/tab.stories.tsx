import type { Meta, StoryObj } from '@storybook/react'

import { Tab } from './tab'

const meta = {
  component: Tab,
  tags: ['autodocs'],
  title: 'Components/Tab',
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { title: 'My Cards', value: 'a' },
      { title: 'All Cards', value: 'c' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { title: 'Switcher', value: 'a' },
      { title: 'Switcher', value: 'c' },
      { title: 'Switcher', value: 'v' },
    ],
  },
}
