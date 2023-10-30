import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/assets/avatar'
import { AvatarLarge } from '@/assets/avatar-large'
import { MyProfileImg } from '@/assets/my-profile-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { EditProfile } from '@/components/auth/edit-profile'
import { FormValues } from '@/components/auth/edit-profile/edit-mode-on'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
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
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const email = 'e@mail.com'
  const [name, setName] = useState('Ivan')

  const decks = useGetDecksQuery({
    currentPage,
    itemsPerPage,
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
      <Header
        avatar={<Avatar />}
        dropDownChildren={
          <>
            <DropDownItem
              icon={<MyProfileImg />}
              onSelect={() => setIsModalOpen(true)}
              text={'My profile'}
            />
            <DropDownItem icon={<SignOutImg />} lastItem text={'Sign Out'} />
          </>
        }
        email={email}
        isLoggedIn
        name={name}
      />
      {isModalOpen && (
        <Modal onOpenChange={() => setIsModalOpen(false)} open={isModalOpen} trigger={<></>}>
          <EditProfile
            avatar={<AvatarLarge />}
            email={email}
            name={name}
            onSubmit={(data: FormValues) => {
              console.log(data)
              setName(data.name)
            }}
          />
        </Modal>
      )}

      <Link to={'/2'}>go to 2</Link>

      <TextField
        label={'Search by name'}
        onChange={e => setSearch(e.currentTarget.value)}
        type={'search'}
        value={search}
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
