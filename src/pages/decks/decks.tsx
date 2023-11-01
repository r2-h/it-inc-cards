import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

import { TrashImg } from '@/assets/trash-img'
import { SignIn } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
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

  const decks = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount: `${sliderValue[1]}`,
    minCardsCount: `${sliderValue[0]}`,
    name: search,
    //debounce
  })

  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const maxCardsCount = decks.data?.maxCardsCount || 61
  // handlers
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(decksActions.setSearch(e.currentTarget.value))
  const clearSearchHandler = () => decksActions.setSearch('')

  const sliderHandler = (newValue: [number, number]) =>
    dispatch(decksActions.setSliderValue(newValue))

  const clearSliderHandler = () =>
    dispatch(decksActions.setSliderValue([0, decks.data?.maxCardsCount || 61]))

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
        <Modal
          trigger={
            <Button disabled={isLoading} onClick={() => createDeck({ name: 'new name' })}>
              Create Deck
            </Button>
          }
        >
          <SignIn />
        </Modal>
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
        />

        <Slider
          label={'Number of cards'}
          max={maxCardsCount}
          onValueChange={sliderHandler}
          value={sliderValue}
        />

        <Button onClick={clearSliderHandler} variant={'secondary'}>
          <TrashImg />
          Clear Filter
        </Button>
      </div>

      <TableDemo columns={columns} data={decks.data?.items} />

      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        onChangePage={currenPageHandler}
        onChangePageSize={itemsPerPageHandler}
        pageSize={itemsPerPage}
        totalCount={decks.data?.pagination.totalItems || 1000}
      />
      <Link to={'/cards'}>asdas</Link>
    </>
  )
}
