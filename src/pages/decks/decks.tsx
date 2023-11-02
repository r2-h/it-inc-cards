import { ChangeEvent } from 'react'

import { TrashImg } from '@/assets/trash-img'
import { ModalForCards } from '@/components/modal-for-cards'
import {
  AddAndEditDeck,
  CreateDeckFormValues,
} from '@/components/modal-for-cards/add-and-edit-pack'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Pagination } from '@/components/ui/pagination'
import { Slider } from '@/components/ui/slider'
import { Tab, TabsType } from '@/components/ui/tab'
import { TableDemo } from '@/components/ui/tables/table-demo'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useMeQuery } from '@/services/auth/auth-api'
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
  const sliderValue = useAppSelector(state => state.decks.sliderValue)
  const search = useAppSelector(state => state.decks.search)
  const tabsValue = useAppSelector(state => state.decks.tabsValue)

  const dispatch = useAppDispatch()
  const currenPageHandler = (number: number) => dispatch(decksActions.setCurrentPage(number))
  const itemsPerPageHandler = (size: string) => dispatch(decksActions.setItemsPerPage(+size))

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(decksActions.setSearch(e.currentTarget.value))
  const clearSearchHandler = () => dispatch(decksActions.setSearch(''))

  const sliderHandler = (newValue: [number, number]) =>
    dispatch(decksActions.setSliderValue(newValue))

  const clearSliderHandler = () =>
    dispatch(decksActions.setSliderValue([0, decks.data?.maxCardsCount || 61]))

  const createDeckHandler = (data: CreateDeckFormValues) =>
    createDeck({ isPrivate: data.isPrivate, name: data.name })

  const setTabsHandler = (value: string) => dispatch(decksActions.setTabsValue(value))

  const decks = useGetDecksQuery({
    authorId: tabsValue,
    currentPage,
    itemsPerPage,
    maxCardsCount: `${sliderValue[1]}`,
    minCardsCount: `${sliderValue[0]}`,
    name: search,
    //debounce
  })

  const { data: me } = useMeQuery()

  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const maxCardsCount = decks.data?.maxCardsCount || 61

  const tabs: TabsType[] = [
    { title: 'My Cards', value: me?.id! },
    { title: 'All Cards', value: '' },
  ]

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

        <Modal trigger={<Button disabled={isLoading}>Create Deck</Button>}>
          <ModalForCards
            body={<AddAndEditDeck onSubmit={createDeckHandler} variant={'add'} />}
            title={'Add new deck'}
          />
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

        <Tab label={'Show decks'} onChange={setTabsHandler} tabs={tabs} value={tabsValue} />

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
    </>
  )
}
