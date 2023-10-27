import { ComponentPropsWithoutRef, FC } from 'react'

import { Body, Row, TD } from '@/components/ui/tables'
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
      {data?.map(item => (
        <Row key={item.name}>
          <TD>{item.name}</TD>
          <TD>{item.cardsCount}</TD>
          <TD>{item.updated}</TD>
          <TD>{item.author.name}</TD>
          <TD>icons...</TD>
        </Row>
      ))}
    </Body>
  )
}
