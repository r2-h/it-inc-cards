import { FC } from 'react'

import { Table } from '@/components/ui/tables'
import { Deck, Direction, Field } from '@/services/decks/types'

import { TableBody, TableHeader } from '.'

export const DeckTable: FC<TableProps> = ({ data, onSort, sort }) => {
  const columns: Column[] = [
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
      sortable: true,
      title: 'Last Updated',
    },
    {
      key: 'createdBy',
      sortable: false,
      title: 'Created by',
    },
  ]

  return (
    <Table>
      <TableHeader columns={columns} onSort={onSort} sort={sort} />
      <TableBody data={data} />
    </Table>
  )
}

//types
type TableProps = {
  data: Array<Deck> | undefined
  onSort: (sort: Sort) => void
  sort: Sort
}
export type Sort = {
  direction: Direction
  key: Field
} | null
export type Column = {
  key: Field
  sortable: boolean
  title: string
}
