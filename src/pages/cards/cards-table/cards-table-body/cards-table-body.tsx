import { ComponentPropsWithoutRef, FC } from 'react'

import { Body, Grade, Row, TD, Typography } from '@/components'
import { EditCell } from '@/pages'
import { CardsResponse } from '@/services'
import clsx from 'clsx'

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
                <Typography
                  as={'a'}
                  className={clsx(card.questionVideo ?? s.disabled)}
                  href={card.questionVideo ?? ''}
                  variant={'body2'}
                >
                  {card.question}
                </Typography>
              </div>
            ) : (
              <Typography
                as={'a'}
                className={clsx(card.questionVideo ?? s.disabled)}
                href={card.questionVideo ?? ''}
                variant={'body2'}
              >
                {card.question}
              </Typography>
            )}
          </TD>
          <TD className={s.textCell}>
            {card?.answerImg ? (
              <div className={s.wrapper}>
                <div className={s.image} style={{ backgroundImage: `url(${card.answerImg})` }} />
                <Typography
                  as={'a'}
                  className={clsx(card.answerVideo ?? s.disabled)}
                  href={card.answerVideo ?? ''}
                  variant={'body2'}
                >
                  {card.answer}
                </Typography>
              </div>
            ) : (
              <Typography
                as={'a'}
                className={clsx(card.answerVideo ?? s.disabled)}
                href={card.answerVideo ?? ''}
                variant={'body2'}
              >
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
            <Grade stars={card?.grade} />
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
