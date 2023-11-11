import { ComponentPropsWithoutRef, FC } from 'react'

import { Typography } from '@/components'
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
          <TD className={s.textCell}>
            {card?.questionImg ? (
              <div className={s.wrapper}>
                <div className={s.image} style={{ backgroundImage: `url(${card.questionImg})` }} />
                <Typography className={s.title} variant={'body2'}>
                  {card.question}
                </Typography>
              </div>
            ) : (
              <Typography className={s.title} variant={'body2'}>
                {card.question}
              </Typography>
            )}
          </TD>
          <TD className={s.textCell}>
            {card?.answerImg ? (
              <div className={s.wrapper}>
                <div className={s.image} style={{ backgroundImage: `url(${card.answerImg})` }} />
                <Typography className={s.title} variant={'body2'}>
                  {card.answer}
                </Typography>
              </div>
            ) : (
              <Typography className={s.title} variant={'body2'}>
                {card.answer}
              </Typography>
            )}
          </TD>
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
          <TD>
            {myDeck ? (
              <EditCell card={card} />
            ) : (
              <EditCell card={card} disabled isEditable={false} />
            )}
          </TD>
        </Row>
      ))}
    </Body>
  )
}
