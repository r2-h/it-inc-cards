import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TableDemo } from '@/components/ui/tables/table-demo'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks'

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
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const decks = useGetDecksQuery({
    itemsPerPage,
    name: search,
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
    <div>
      <Link to={'/2'}>go to 2</Link>
      <TextField
        label={'Search by name'}
        onChange={e => setSearch(e.currentTarget.value)}
        type={'search'}
        value={search}
      />
      <Button disabled={isLoading} onClick={() => createDeck({ name: 'name' })}>
        create deck
      </Button>
      <Button onClick={() => setItemsPerPage(30)}>30 items per page</Button>
      <Button onClick={() => setItemsPerPage(10)}>10 items per page</Button>

      <TableDemo columns={columns} data={decks.data?.items} />
    </div>
  )
}
