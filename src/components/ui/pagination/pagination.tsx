import ArrowLeft from '@/assets/keyboard-arrow-left'
import ArrowRight from '@/assets/keyboard-arrow-rigth'
import { usePagination } from '@/components/ui/pagination/usePagination'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

import s from './pagination.module.scss'

const options = [
  { id: '10', value: '10' },
  { id: '20', value: '20' },
  { id: '30', value: '30' },
  { id: '50', value: '50' },
  { id: '100', value: '100' },
]

export type PaginationPropsType = {
  currentPage: number
  onChangePage: (page: number) => void
  onChangePageSize: (size: string) => void
  pageSize: number
  totalCount: number
}
export const Pagination = ({
  currentPage,
  onChangePage,
  onChangePageSize,
  pageSize,
  totalCount,
}: PaginationPropsType) => {
  const { isFirstPage, isLastPage, nextPageHandler, onClickHandler, pages, prevPageHandler } =
    usePagination({
      currentPage,
      onChangePage,
      pageSize,
      totalCount,
    })

  return (
    <div className={s.root}>
      <div className={s.buttons_container}>
        <button className={s.leftArrow} disabled={isFirstPage} onClick={prevPageHandler}>
          <ArrowLeft />
        </button>
        {pages?.map((p, i) => {
          switch (typeof p) {
            case 'string': {
              return (
                <span className={s.dots} key={i}>
                  {p}
                </span>
              )
            }
            default:
              return (
                <button
                  className={s.page}
                  disabled={currentPage === p}
                  key={i}
                  onClick={() => onClickHandler(p)}
                >
                  {p}
                </button>
              )
          }
        })}
        <button className={s.rigthArrow} disabled={isLastPage} onClick={nextPageHandler}>
          <ArrowRight />
        </button>
      </div>
      <div className={s.select_container}>
        <Typography className={s.text} variant={'body2'}>
          Show
        </Typography>

        <Select
          className={s.select}
          onChangeValue={onChangePageSize}
          options={options}
          value={`${pageSize}`}
        />

        <Typography className={s.text} variant={'body2'}>
          per page
        </Typography>
      </div>
    </div>
  )
}
