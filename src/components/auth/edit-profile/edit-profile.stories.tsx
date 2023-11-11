import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from '@/services'
import { Dialog } from '@radix-ui/react-dialog'

import { EditProfileFormValues } from './edit-mode-on'
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
    avatar: undefined,
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
    onSubmit: (data: EditProfileFormValues) => {
      console.log(data)
    },
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <BrowserRouter>
          <Dialog>
            <Story />
          </Dialog>
        </BrowserRouter>
      </Provider>
    ),
  ],
}
