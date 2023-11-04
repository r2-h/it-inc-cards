import { ComponentProps, FC } from 'react'

import clsx from 'clsx'

import s from './tables.module.scss'

export const Table: FC<TableProps> = props => {
  const tableCN = clsx(s.table, props.className)

  return <table className={tableCN} {...props} />
}

export const Head: FC<HeadProps> = props => {
  return <thead {...props} />
}
export const Body: FC<BodyProps> = props => {
  return <tbody {...props} />
}

export const Row: FC<RowProps> = props => {
  const rowCN = clsx(s.row, props.className)

  return <tr className={rowCN} {...props} />
}

export const TH: FC<THeadCellProps> = ({ className, ...rest }) => {
  const cellCN = clsx(className, s.headCell)

  return <th className={cellCN} {...rest} />
}

export const TD: FC<TDataProps> = ({ className, ...rest }) => {
  const cellCN = clsx(s.tableCell, className)

  return <td className={cellCN} {...rest} />
}

export type TableProps = ComponentProps<'table'>
export type HeadProps = ComponentProps<'thead'>
export type BodyProps = ComponentProps<'tbody'>
export type RowProps = ComponentProps<'tr'>
export type THeadCellProps = ComponentProps<'th'>
export type TDataProps = ComponentProps<'td'>
