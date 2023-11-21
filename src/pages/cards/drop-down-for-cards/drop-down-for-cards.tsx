import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
import {
  CreateDeckFormValues,
  Delete,
  DropDown,
  DropDownItem,
  EditDeck,
  Modal,
  ModalWrapper,
  TriggerMore,
} from '@/components'
import { Deck, useDeleteDeckMutation, useUpdateDeckMutation } from '@/services'

type Props = {
  deck?: Deck
}

export const DropDownForCards = ({ deck }: Props) => {
  const navigate = useNavigate()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const updateDeckHandler = (data: CreateDeckFormValues) => {
    setIsEditModalOpen(false)
    if (deck?.id) {
      updateDeck({ cover: data.image, id: deck.id, isPrivate: data.isPrivate, name: data.name })
    }
  }
  const deleteDeckHandler = () => {
    if (deck?.id) {
      deleteDeck({ id: deck.id })
      navigate('/')
    }
  }
  const learnCardsHandler = () => {
    if (deck?.cardsCount) {
      navigate(`/learn-deck/${deck?.id}`)
    }
  }

  return (
    <>
      <DropDown trigger={<TriggerMore />}>
        <DropDownItem
          disabled={!deck?.cardsCount}
          icon={<PlayCircleImg />}
          onSelect={learnCardsHandler}
          text={'Learn'}
        />
        <DropDownItem icon={<EditImg />} onSelect={() => setIsEditModalOpen(true)} text={'Edit'} />
        <DropDownItem
          icon={<TrashImg />}
          lastItem
          onSelect={() => setIsDeleteModalOpen(true)}
          text={'Delete'}
        />
      </DropDown>
      {isEditModalOpen && (
        <Modal onOpenChange={() => setIsEditModalOpen(false)} open={isEditModalOpen}>
          <ModalWrapper
            body={
              <EditDeck
                cover={deck?.cover}
                isPrivate={deck?.isPrivate}
                name={deck?.name}
                onSubmit={updateDeckHandler}
                variant={'edit'}
              />
            }
            title={'Edit Deck'}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal onOpenChange={() => setIsDeleteModalOpen(false)} open={isDeleteModalOpen}>
          <ModalWrapper
            body={<Delete callback={deleteDeckHandler} title={deck!.name} variant={'Deck'} />}
            title={'Delete Deck'}
          />
        </Modal>
      )}
    </>
  )
}
