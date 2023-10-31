import { ComponentPropsWithoutRef, FC } from 'react'

import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
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
          <TD>{new Date(item.updated).toLocaleDateString()}</TD>
          <TD>{item.author.name}</TD>
          <TD>
            <div
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              <button style={{ display: 'flex' }}>
                <PlayCircleImg />
              </button>
              <button style={{ display: 'flex' }}>
                <EditImg />
              </button>
              <button style={{ display: 'flex' }}>
                <TrashImg />
              </button>
            </div>
          </TD>
        </Row>
      ))}
    </Body>
  )
}
