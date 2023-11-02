import type { Meta, StoryObj } from '@storybook/react'

import { FC, useState } from 'react'

import { Pagination, PaginationProps } from '@/components/ui/pagination/pagination'

const meta = {
  component: Pagination,

  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      exclude: /(?:\b|')(currentPage|pageSize|onPageChange)(?:\b|')/g,
    },
  },
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

const ControlledPagination: FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  onChangePageSize,
  pageSize,
  ...args
}) => {
  const [page, setPage] = useState(1)
  const [pSize, setPSize] = useState('10')

  return (
    <Pagination
      currentPage={page}
      onChangePage={setPage}
      onChangePageSize={setPSize}
      pageSize={+pSize}
      {...args}
    />
  )
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 90,
  },
  render: args => <ControlledPagination {...args} />,
}
