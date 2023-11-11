import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { CreateNewPassword, CreatePasswordFormValues } from '@/components'
import { store } from '@/services'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: (data: CreatePasswordFormValues) => {
      console.log(data)
    },
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
}
