import { ComponentPropsWithoutRef, FC } from 'react'
import { Link } from 'react-router-dom'

import { Body, EditButtons, Row, TD, Typography } from '@/components'
import { Deck } from '@/services'

import s from './table-body.module.scss'

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
          <TD className={s.cellWrapper}>
            <Link className={s.link} to={`/cards/${item.id}`}>
              {item.cover ? (
                <div className={s.wrapper}>
                  <div className={s.deckImage} style={{ backgroundImage: `url(${item.cover})` }} />
                  <Typography variant={'body2'}>{item.name}</Typography>
                </div>
              ) : (
                <Typography variant={'body2'}>{item.name}</Typography>
              )}
            </Link>
          </TD>
          <TD className={s.cardsCountCell}>{item.cardsCount}</TD>
          <TD>
            {new Date(item.updated).toLocaleString('ru-RU', {
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })}
          </TD>
          <TD className={s.authorCell}>
            {item.author.name}
            {item.isPrivate && (
              <Typography className={s.private} variant={'body2'}>
                private
              </Typography>
            )}
          </TD>
          <TD className={s.editCell}>
            <EditButtons item={item} />
          </TD>
        </Row>
      ))}
    </Body>
  )
}
