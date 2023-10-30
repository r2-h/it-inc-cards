import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/assets/avatar.tsx'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { TableDemo } from '@/components/ui/tables/table-demo'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks-api'

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
    sortable: false,
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
  const [name, setName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const decks = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name,
    //debounce
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  console.log(decks)
  if (decks.isLoading) {
    return <div>...loading</div>
  }

  if (decks.isError) {
    return <div>ERROR</div>
  }

  return (
    <>
      <Header avatar={<Avatar />} email={'e@mail.com'} isLoggedIn name={'Ivan'} />
      <Link to={'/2'}>go to 2</Link>

      <TextField
        label={'Search by name'}
        onChange={e => setName(e.currentTarget.value)}
        type={'search'}
        value={name}
      />

      <Button disabled={isLoading} onClick={() => createDeck({ name: 'new name' })}>
        create deck
      </Button>

      <Button onClick={() => setItemsPerPage(30)}>30 items per page</Button>
      <Button onClick={() => setItemsPerPage(10)}>10 items per page</Button>

      <TableDemo columns={columns} data={decks.data?.items} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '30px' }}>
        {[...Array(decks.data?.pagination?.totalPages)].map((_, i) => (
          <Button key={i} onClick={() => setCurrentPage(i + 1)} variant={'secondary'}>
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  )
}
