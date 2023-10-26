import { FC, useState } from 'react'

import { TableHeader } from '@/components/ui/tables/table-header'

import { TableBody } from '../table-body/table-body'
import { Table } from '../tables'

export const TableDemo: FC<TableProps> = ({ columns, data }) => {
  const [sort, setSort] = useState<Sort>(null)

  return (
    <Table>
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody data={data} />
    </Table>
  )
}

type TableProps = {
  columns: Array<Column>
  data: Array<DataType>
}
type DataType = {
  cardsCount: number
  createdBy: string
  title: string
  updated: string
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
