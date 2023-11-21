import { ChangeEvent, useState } from 'react'

import { TrashImg } from '@/assets/trash-img'
import {
  Button,
  CreateDeckFormValues,
  EditDeck,
  Modal,
  ModalWrapper,
  OptionsType,
  Pagination,
  Slider,
  Tab,
  TextField,
  Typography,
} from '@/components'
import { DeckTable, Sort } from '@/pages'
import {
  Direction,
  Field,
  decksActions,
  useAppDispatch,
  useAppSelector,
  useCreateDeckMutation,
  useGetDecksQuery,
  useMeQuery,
} from '@/services'

import s from './decks.module.scss'

export const Decks = () => {
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const sort = useAppSelector(state => state.decks.sort)
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const sliderValue = useAppSelector(state => state.decks.sliderValue)
  const search = useAppSelector(state => state.decks.search)
  const tabsValue = useAppSelector(state => state.decks.tabsValue)

  const dispatch = useAppDispatch()

  const orderByValue: `${Field}-${Direction}` | undefined = sort
    ? `${sort.key}-${sort.direction}`
    : undefined

  const decks = useGetDecksQuery({
    authorId: tabsValue,
    currentPage,
    itemsPerPage,
    maxCardsCount: `${sliderValue[1]}`,
    minCardsCount: `${sliderValue[0]}`,
    name: search,
    orderBy: orderByValue,
  })
  const { data: me } = useMeQuery()
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const currenPageHandler = (number: number) => dispatch(decksActions.setCurrentPage(number))
  const itemsPerPageHandler = (size: string) => dispatch(decksActions.setItemsPerPage(+size))
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(decksActions.setSearch(e.currentTarget.value))
  const clearSearchHandler = () => dispatch(decksActions.setSearch(''))
  const sliderHandler = (newValue: [number, number]) =>
    dispatch(decksActions.setSliderValue(newValue))
  const clearSliderHandler = () =>
    dispatch(decksActions.setSliderValue([0, decks.data?.maxCardsCount || 61]))
  const createDeckHandler = (data: CreateDeckFormValues) => {
    setIsModalOpen(false)

    createDeck({ cover: data.image, isPrivate: data.isPrivate, name: data.name })
  }

  const setTabsHandler = (value: string) => dispatch(decksActions.setTabsValue(value))
  const sortHandler = (sort: Sort) => dispatch(decksActions.setSort(sort))

  const options: OptionsType[] = [
    { title: 'My Cards', value: me?.id ?? 'My Cards' },
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
        <Typography variant={'large'}>Decks list</Typography>

        <Button disabled={isLoading} onClick={() => setIsModalOpen(true)}>
          Create Deck
        </Button>
        <Modal onOpenChange={() => setIsModalOpen(false)} open={isModalOpen}>
          <ModalWrapper
            body={<EditDeck onSubmit={createDeckHandler} variant={'add'} />}
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

        <Tab label={'Show decks'} onChange={setTabsHandler} options={options} value={tabsValue} />

        <Slider
          label={'Number of cards'}
          max={decks.data?.maxCardsCount || 61}
          onValueChange={sliderHandler}
          value={sliderValue}
        />

        <Button onClick={clearSliderHandler} variant={'secondary'}>
          <TrashImg />
          Clear Filter
        </Button>
      </div>

      <DeckTable data={decks.currentData?.items} onSort={sortHandler} sort={sort} />

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
