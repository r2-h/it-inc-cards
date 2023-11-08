import { ComponentPropsWithoutRef, FC } from 'react'

import { ArrowDown } from '@/assets/arrow-down'
import { ArrowUp } from '@/assets/arrow-up'
import { Head, Row, TH } from '@/components/ui/tables'
import { CardsColumn, CardsColumnField, CardsSort } from '@/pages/cards/cards-table'

import s from './cards-table-header.module.scss'

export const CardsTableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      columns: CardsColumn[]
      onSort?: (sort: CardsSort) => void
      sort?: CardsSort
    },
    'children'
  >
> = ({ columns, onSort, sort, ...restProps }) => {
  const handleSort = (key: CardsColumnField, sortable?: boolean) => () => {
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
