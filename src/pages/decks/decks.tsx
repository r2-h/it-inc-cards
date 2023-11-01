import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

import { TrashImg } from '@/assets/trash-img'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tab } from '@/components/ui/tab'
import { TableDemo } from '@/components/ui/tables/table-demo'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks-api'
import { decksActions } from '@/services/decks/decks-slice'
import { useAppDispatch, useAppSelector } from '@/services/store'

import s from './decks.module.scss'

const columns = [
  {
    key: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'Cards',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    sortable: true,
    title: 'Created by',
  },
]

export const Decks = () => {
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const currenPageHandler = (number: number) => dispatch(decksActions.setCurrentPage(number))
  const itemsPerPageHandler = (size: string) => dispatch(decksActions.setItemsPerPage(+size))

  const sliderValue = useAppSelector(state => state.decks.sliderValue)
  const search = useAppSelector(state => state.decks.search)
  const dispatch = useAppDispatch()

  // handlers
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(decksActions.setSearch(e.currentTarget.value))
  const clearSearchHandler = () => decksActions.setSearch('')

  const sliderHandler = (newValue: [number, number]) =>
    dispatch(decksActions.setSliderValue(newValue))

  const decks = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount: `${sliderValue[1]}`,
    minCardsCount: `${sliderValue[0]}`,
    name: search,
    //debounce
  })

  const [createDeck, { isLoading }] = useCreateDeckMutation()

  if (decks.isLoading) {
    return <div>...loading</div>
  }

  if (decks.isError) {
    return <div>ERROR</div>
  }

  return (
    <>
      <div className={s.wrapper}>
        <Typography className={s.title} variant={'large'}>
          Decks list
        </Typography>

        <Button disabled={isLoading} onClick={() => createDeck({ name: 'new name' })}>
          Create Deck
        </Button>
      </div>

      <div className={s.wrapper2}>
        <TextField
          className={s.search}
          onChange={searchHandler}
          onClearClick={clearSearchHandler}
          type={'search'}
          value={search}
        />
        <Tab
          label={'Show decks'}
          tabs={[
            { title: 'My Cards', value: 'My Cards' },
            { title: 'All Cards', value: 'All Cards' },
          ]}
        ></Tab>
        <Slider label={'Number of cards'} onValueChange={sliderHandler} value={sliderValue} />
        <Button onClick={() => sliderHandler([0, 100])} variant={'secondary'}>
          <TrashImg />
          Clear Filter
        </Button>
      </div>

      <TableDemo columns={columns} data={decks.data?.items} />

      <Pagination
        currentPage={currentPage}
        onChangePage={currenPageHandler}
        onChangePageSize={itemsPerPageHandler}
        pageSize={itemsPerPage}
        totalCount={90}
      />
      <Link to={'/cards'}>go to cards</Link>
    </>
  )
}
