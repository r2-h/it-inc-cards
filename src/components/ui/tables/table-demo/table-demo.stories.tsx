import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { TableDemo } from '@/components'
import { Deck, store } from '@/services'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: TableDemo,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof TableDemo>

export default meta
type Story = StoryObj<typeof meta>

const data: Deck[] = [
  {
    author: {
      id: '1',
      name: 'John Doe',
    },
    cardsCount: 10,
    cover: '',
    created: 'string',
    id: '',
    isBlocked: null,
    isDeleted: null,
    isPrivate: false,
    name: 'Project A',
    rating: 0,
    shots: 0,
    updated: '2023-07-07',
    userId: '',
  },
  {
    author: {
      id: '2',
      name: 'Jane Smith',
    },
    cardsCount: 5,
    cover: '',
    created: 'string',
    id: '',
    isBlocked: null,
    isDeleted: null,
    isPrivate: false,
    name: 'Project B',
    rating: 0,
    shots: 0,
    updated: '2023-07-06',
    userId: '',
  },
  {
    author: {
      id: '3',
      name: 'Alice Johnson',
    },
    cardsCount: 8,
    cover: 'null',
    created: 'string',
    id: '',
    isBlocked: null,
    isDeleted: null,
    isPrivate: false,
    name: 'Project C',
    rating: 0,
    shots: 0,
    updated: '2023-07-05',
    userId: '',
  },
  {
    author: {
      id: '4',
      name: 'Bob Anderson',
    },
    cardsCount: 3,
    cover: 'null',
    created: 'string',
    id: '',
    isBlocked: null,
    isDeleted: null,
    isPrivate: false,
    name: 'Project D',
    rating: 0,
    shots: 0,
    updated: '2023-07-07',
    userId: '',
  },
  {
    author: {
      id: '5',
      name: 'Emma Davis',
    },
    cardsCount: 12,
    cover: 'null',
    created: 'string',
    id: '',
    isBlocked: null,
    isDeleted: null,
    isPrivate: false,
    name: 'Project E',
    rating: 0,
    shots: 0,
    updated: '2023-07-04',
    userId: '',
  },
]

const columns = [
  {
    key: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'Cards',
  },
  {
    key: 'updated',
    sortable: false,
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    sortable: true,
    title: 'Created by',
  },
]

export const Default: Story = {
  args: {
    columns: columns,
    data: data,
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
  render: () => {
    return <TableDemo columns={columns} data={data} />
  },
}
