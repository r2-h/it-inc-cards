import { ComponentPropsWithoutRef, FC } from 'react'

import { Body, Row, TD } from '@/components/ui/tables'
import { EditButtons } from '@/components/ui/tables/edit-buttons/edit-buttons'
import { Deck } from '@/services/decks/types'

export const TableBody: FC<
  Omit<
    ComponentPropsWithoutRef<'tbody'> & {
      data: Deck[] | undefined
    },
    'children'
  >
> = ({ data, ...restProps }) => {
  return (
    <Body {...restProps}>
      {data?.map((item, idx) => (
        <Row key={item.name + idx}>
          <TD>{item.name}</TD>
          <TD>{item.cardsCount}</TD>
          <TD>{new Date(item.updated).toLocaleDateString()}</TD>
          <TD>{item.author.name}</TD>
          <TD>
            <EditButtons />
          </TD>
        </Row>
      ))}
    </Body>
  )
}
