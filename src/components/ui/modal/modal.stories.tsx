import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Button, SignIn } from '@/components'
import { store } from '@/services'
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
    children: <SignIn onSubmit={() => {}} />,
    trigger: <Button>Sign In</Button>,
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
