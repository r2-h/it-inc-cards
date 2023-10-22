import { useCallback, useMemo } from 'react'

type PaginationParamsType = {
  currentPage: number
  onChangePage: (page: number) => void
  pageSize: number
  totalCount: number
}

export const usePagination = ({
  currentPage,
  onChangePage,
  pageSize,
  totalCount,
}: PaginationParamsType) => {
  const createPages = (start: number, stop: number) => {
    const arrLength = stop - start + 1

    return Array.from({ length: arrLength }, (_, i) => i + start)
  }

  const pages = useMemo(() => {
    const DOTS = '\u2026'
    const siblingCount = 1
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers: number = siblingCount + 5
    /*Case 1:  less than totalPageNumbers */

    if (totalPageNumbers >= totalPageCount) {
      return createPages(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount
    /* Case 2: show only right dots */

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = createPages(1, 5)

      return [...leftRange, DOTS, totalPageCount]
    }

    /* Case 3: show only left dots */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = createPages(totalPageCount - 4, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    /* Case 4: show left & rigth dots */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = createPages(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [currentPage, pageSize, totalCount])

  const nextPageHandler = useCallback(() => {
    onChangePage(currentPage + 1)
  }, [currentPage, onChangePage])

  const prevPageHandler = useCallback(() => {
    onChangePage(currentPage - 1)
  }, [currentPage, onChangePage])

  const isLastPage = currentPage === pages[pages.length - 1]
  const isFirstPage = currentPage === 1
  const onClickHandler = (page: number) => onChangePage(page)

  return {
    isFirstPage,
    isLastPage,
    nextPageHandler,
    onClickHandler,
    pages,
    prevPageHandler,
  }
}
