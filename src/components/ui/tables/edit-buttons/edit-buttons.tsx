import { FC } from 'react'

import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
import { ModalForCards } from '@/components/modal-for-cards'
import { Delete } from '@/components/modal-for-cards/delete'
import { Modal } from '@/components/ui/modal'
import { useMeQuery } from '@/services/auth/auth-api'
import { useDeleteDeckMutation } from '@/services/decks/decks-api'
import { Deck } from '@/services/decks/types'
import clsx from 'clsx'

import s from './edit-buttons.module.scss'

type EditButtonsProps = {
  item: Deck
}
export const EditButtons: FC<EditButtonsProps> = ({ item }) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const { data: me } = useMeQuery()
  const my = me?.id === item.userId

  const buttonCN = clsx(!my && s.disabled)

  const deleteHandler = () => {
    if (my) {
      deleteDeck({ id: item.id })
    }
  }

  return (
    <div className={s.wrapper}>
      <button>
        <PlayCircleImg />
      </button>
      <button className={buttonCN}>
        <EditImg />
      </button>
      <Modal
        trigger={
          <button className={buttonCN}>
            <TrashImg />
          </button>
        }
      >
        <ModalForCards
          body={<Delete callback={deleteHandler} title={item.name} />}
          title={'Delete Deck'}
        />
      </Modal>
    </div>
  )
}
