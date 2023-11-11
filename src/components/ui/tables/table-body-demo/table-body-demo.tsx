import { ComponentPropsWithoutRef, FC } from 'react'
import { Link } from 'react-router-dom'

import { Body, Row, TD } from '@/components/ui/tables'
import { Deck } from '@/services/decks/types'

import s from './table-body-demo.module.scss'

export const TableBodyDemo: FC<
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
          <TD>
            <Link className={s.link} to={`/cards/${item.id}`}>
              {item.name}
            </Link>
          </TD>
          <TD>{item.cardsCount}</TD>
          <TD>{new Date(item.updated).toLocaleDateString()}</TD>
          <TD>{item.author.name}</TD>
          <TD></TD>
        </Row>
      ))}
    </Body>
  )
}
