import type { Meta, StoryObj } from '@storybook/react'

import { Tab } from './tab-switcher'

const meta = {
  component: Tab,
  tags: ['autodocs'],
  title: 'Components/Tab',
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: [
      { title: 'Switcher', value: 'a' },
      { title: 'Switcher', value: 'c' },
      { title: 'Switcher', value: 'v' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    tabs: [
      { title: 'Switcher', value: 'a' },
      { title: 'Switcher', value: 'c' },
      { title: 'Switcher', value: 'v' },
    ],
  },
}
