import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { EditButtons } from '@/components'
import { store } from '@/services'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: EditButtons,
  tags: ['autodocs'],
  title: 'Components/EditButtons',
} satisfies Meta<typeof EditButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: {
      author: { id: 'asd', name: 'ada' },
      cardsCount: 1,
      cover: 'string',
      created: 'string',
      id: 'string',
      isBlocked: false,
      isDeleted: false,
      isPrivate: false,
      name: 'string',
      rating: 1,
      shots: 1,
      updated: 'string',
      userId: 'string',
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
