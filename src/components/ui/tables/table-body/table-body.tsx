import { ComponentPropsWithoutRef, FC } from 'react'

import { Body, Row, TD } from '@/components/ui/tables'

type DataType = {
  cardsCount: number
  createdBy: string
  title: string
  updated: string
}
export const TableBody: FC<
  Omit<
    ComponentPropsWithoutRef<'tbody'> & {
      data: DataType[]
    },
    'children'
  >
> = ({ data, ...restProps }) => {
  return (
    <Body {...restProps}>
      {data.map(item => (
        <Row key={item.title}>
          <TD>{item.title}</TD>
          <TD>{item.cardsCount}</TD>
          <TD>{item.updated}</TD>
          <TD>{item.createdBy}</TD>
          <TD>icons...</TD>
        </Row>
      ))}
    </Body>
  )
}
