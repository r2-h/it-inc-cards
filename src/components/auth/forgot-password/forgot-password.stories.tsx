import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword, ForgotPasswordFormValues } from './forgot-password'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: (data: ForgotPasswordFormValues) => {
      console.log(data)
    },
  },
}
