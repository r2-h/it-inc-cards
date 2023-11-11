import { FC, useState } from 'react'

import { Deck } from '@/services/decks/types'

import { TableBodyDemo } from '..'
import { TableHeaderDemo } from '../table-header-demo'
import { Table } from '../tables'

export const TableDemo: FC<TableProps> = ({ columns, data }) => {
  const [sort, setSort] = useState<Sort>(null)

  return (
    <Table>
      <TableHeaderDemo columns={columns} onSort={setSort} sort={sort} />
      <TableBodyDemo data={data} />
    </Table>
  )
}

type TableProps = {
  columns: Array<Column>
  data: Array<Deck> | undefined
}

type Column = {
  key: string
  sortable: boolean
  title: string
}
type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null
