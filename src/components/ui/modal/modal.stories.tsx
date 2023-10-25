import { SignIn } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <SignIn />,
    trigger: <Button>Edit profile</Button>,
  },
}
