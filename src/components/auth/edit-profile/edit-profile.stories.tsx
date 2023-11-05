import type { Meta, StoryObj } from '@storybook/react'

import ava from '../../../assets/ava.jpg'
import { FormValues } from './edit-mode-on'
import { EditProfile } from './edit-profile'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Auth/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    avatar: ava,
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
    onSubmit: (data: FormValues) => {
      console.log(data)
    },
  },
}
