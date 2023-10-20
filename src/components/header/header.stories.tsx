import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/header/header'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    isLoggedIn: false,
  },
}

export const HeaderWithAvatar: Story = {
  args: {
    isLoggedIn: true,
    name: 'Ivan',
  },
}
