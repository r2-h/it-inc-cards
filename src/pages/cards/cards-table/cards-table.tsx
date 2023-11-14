import { FC } from 'react'

import { Table } from '@/components/ui/tables'
import { CardsTableBody } from '@/pages/cards/cards-table/cards-table-body'
import { CardsTableHeader } from '@/pages/cards/cards-table/cards-table-header'
import { CardsResponse } from '@/services'
import { Direction } from '@/services/decks/types'

export const CardsTable: FC<CardsTableProps> = ({ data, myDeck, onSort, sort }) => {
  const columns: CardsColumn[] = [
    {
      key: 'question',
      sortable: false,
      title: 'Question',
    },
    {
      key: 'answer',
      sortable: false,
      title: 'Answer',
    },
    {
      key: 'updated',
      sortable: false,
      title: 'Last Updated',
    },
    {
      key: 'grade',
      sortable: true,
      title: 'Grade',
    },
  ]

  return (
    <Table>
      <CardsTableHeader columns={columns} onSort={onSort} sort={sort} />
      <CardsTableBody data={data} myDeck={myDeck} />
    </Table>
  )
}

// types
type CardsTableProps = {
  data: CardsResponse[] | undefined
  myDeck: boolean
  onSort?: (sort: CardsSort) => void
  sort?: CardsSort
}
export type CardsSort = {
  direction: Direction
  key: CardsColumnField
} | null
export type CardsColumn = {
  key: CardsColumnField
  sortable: boolean
  title: string
}
export type CardsColumnField = 'answer' | 'grade' | 'question' | 'updated'
