import { useState } from 'react'
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
import { setSliderValue } from '@/services/decks/decks-slice'
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
  const [itemsPerPage, setItemsPerPage] = useState(10) // в слайс редакса
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100])
  const sliderValue = useAppSelector(state => state.decks.sliderValue)
  const dispatch = useAppDispatch()
  const handleSliderChange = (newValue: [number, number]) => {
    dispatch(setSliderValue(newValue))
  }

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
          onChange={e => setSearch(e.currentTarget.value)}
          onClearClick={() => setSearch('')}
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
        <Slider
          label={'Number of cards'}
          onValueChange={handleSliderChange}
          value={sliderValue}
        ></Slider>
        <Button onClick={() => setSliderValue([0, 100])} variant={'secondary'}>
          <TrashImg />
          Clear Filter
        </Button>
      </div>

      <TableDemo columns={columns} data={decks.data?.items} />

      <Pagination
        currentPage={currentPage}
        onChangePage={setCurrentPage}
        onChangePageSize={val => setItemsPerPage(+val)}
        pageSize={itemsPerPage}
        totalCount={90}
      />
      {/*<div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '30px' }}>*/}
      {/*  {[...Array(decks.data?.pagination?.totalPages)].map((_, i) => (*/}
      {/*    <Button key={i} onClick={() => setCurrentPage(i + 1)} variant={'secondary'}>*/}
      {/*      {i + 1}*/}
      {/*    </Button>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <Link to={'/cards'}>go to cards</Link>
      {/*<Button onClick={() => setItemsPerPage(30)}>30 items per page</Button>*/}
    </>
  )
}
