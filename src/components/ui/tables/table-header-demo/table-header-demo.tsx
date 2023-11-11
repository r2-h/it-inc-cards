import { ComponentPropsWithoutRef, FC } from 'react'

import { ArrowDown } from '@/assets/arrow-down'
import { ArrowUp } from '@/assets/arrow-up'
import { Head, Row, TH } from '@/components/ui/tables'

import s from './table-header-demo.module.scss'

export const TableHeaderDemo: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      onSort?: (sort: Sort) => void
      sort?: Sort
    },
    'children'
  >
> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <Head {...restProps}>
      <Row>
        {columns.map(({ key, sortable, title }) => (
          <TH key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && (
              <span className={s.arrow}>
                {sort.direction === 'asc' ? <ArrowUp /> : <ArrowDown />}
              </span>
            )}
          </TH>
        ))}
        <TH></TH>
      </Row>
    </Head>
  )
}

type Column = {
  key: string
  sortable: boolean
  title: string
}
type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null
