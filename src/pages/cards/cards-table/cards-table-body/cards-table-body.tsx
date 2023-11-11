import { ComponentPropsWithoutRef, FC } from 'react'

import { Body, Row, TD } from '@/components/ui/tables'
import { Grade } from '@/components/ui/tables/grade'
import { EditCell } from '@/pages/cards/editCell'
import { CardsResponse } from '@/services'

import s from './cards-table-body.module.scss'

export const CardsTableBody: FC<
  Omit<
    ComponentPropsWithoutRef<'tbody'> & {
      data: CardsResponse[] | undefined
      myDeck: boolean
    },
    'children'
  >
> = ({ data, myDeck, ...restProps }) => {
  return (
    <Body {...restProps}>
      {data?.map(card => (
        <Row key={card?.id}>
          <TD className={s.textCell}>{card?.question}</TD>
          <TD className={s.textCell}>{card?.answer}</TD>
          <TD>
            {new Date(card.updated).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })}
          </TD>
          <TD>
            <Grade stars={card.rating} />
          </TD>
          {myDeck ? <EditCell card={card} /> : <EditCell card={card} disabled isOpen={false} />}
        </Row>
      ))}
    </Body>
  )
}
