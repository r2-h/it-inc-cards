import { ComponentPropsWithoutRef, FC } from 'react'
import { Link } from 'react-router-dom'

import { Body, Row, TD } from '@/components/ui/tables'
import { EditButtons } from '@/components/ui/tables/edit-buttons/edit-buttons'
import { Typography } from '@/components/ui/typography'
import { Deck } from '@/services/decks/types'

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
          <TD>
            <Link className={s.link} to={`/cards/${item.id}`}>
              <Typography className={s.title} variant={'body2'}>
                {item.name}
              </Typography>
              {item.cover && <img alt={'deck image'} className={s.deckImage} src={item.cover} />}
            </Link>
            {item.isPrivate && (
              <Typography className={s.private} variant={'body2'}>
                private
              </Typography>
            )}
          </TD>
          <TD>{item.cardsCount}</TD>
          <TD>{new Date(item.updated).toLocaleString('en-GB')}</TD>
          <TD>{item.author.name}</TD>
          <TD>
            <EditButtons item={item} />
          </TD>
        </Row>
      ))}
    </Body>
  )
}
