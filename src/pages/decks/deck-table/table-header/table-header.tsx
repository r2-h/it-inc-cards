import { ComponentPropsWithoutRef, FC } from 'react'

import { ArrowDown } from '@/assets/arrow-down'
import { ArrowUp } from '@/assets/arrow-up'
import { Head, Row, TH } from '@/components/ui/tables'
import { Column, Sort } from '@/pages/decks'
import { Field } from '@/services/decks/types'

import s from './table-header.module.scss'

export const TableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      onSort?: (sort: Sort) => void
      sort?: Sort
    },
    'children'
  >
> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: Field, sortable?: boolean) => () => {
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
            <div className={`${s.wrapper} ${!sortable && s.notSortable}`}>
              {title}
              {sort && sort.key === key && (
                <span>
                  {sort.direction === 'asc' ? (
                    <ArrowUp className={s.arrow} />
                  ) : (
                    <ArrowDown className={s.arrow} />
                  )}
                </span>
              )}
            </div>
          </TH>
        ))}
        <TH></TH>
      </Row>
    </Head>
  )
}
