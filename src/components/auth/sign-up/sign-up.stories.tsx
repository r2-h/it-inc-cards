import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouter } from 'react-router-dom'

import { SignUp, SignUpFormValues } from './sign-up'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: (data: SignUpFormValues) => {
      console.log(data)
    },
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}
