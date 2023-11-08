import { FC } from 'react'

import { EditImg } from '@/assets/edit-img'
import { TrashImg } from '@/assets/trash-img'
import { ModalForCards } from '@/components/modal-for-cards'
import { AddAndEditCard, AddCardsFormValues } from '@/components/modal-for-cards/add-and-edit-card'
import { Delete } from '@/components/modal-for-cards/delete'
import { Modal } from '@/components/ui/modal'
import { TD } from '@/components/ui/tables'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards-api'
import { CardsResponse } from '@/services/cards/types'
import clsx from 'clsx'

import s from './editCell.module.scss'

type EditCellProps = {
  card: CardsResponse
  disabled?: boolean
  isOpen?: boolean
}

export const EditCell: FC<EditCellProps> = ({ card, disabled, isOpen }) => {
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const editCardHandler = (id: string, data: AddCardsFormValues) => {
    updateCard({ answer: data.answer, id, question: data.question })
  }

  const deleteCardHandler = (id: string) => {
    deleteCard({ id })
  }
  const iconCN = clsx(s.icon, disabled && s.disabled)

  return (
    <TD>
      <div className={s.buttons}>
        <Modal open={isOpen} trigger={<EditImg className={iconCN} />}>
          <ModalForCards
            body={
              <AddAndEditCard
                defaultValue={{ answer: card.answer, question: card.question }}
                onSubmit={(data: AddCardsFormValues) => {
                  editCardHandler(card.id, data)
                }}
                variant={'edit'}
              />
            }
            title={'Edit Card'}
          />
        </Modal>
        <Modal open={isOpen} trigger={<TrashImg className={iconCN} />}>
          <ModalForCards
            body={
              <Delete
                callback={() => {
                  deleteCardHandler(card.id)
                }}
                title={card?.question}
                titleButton={'Delete Card'}
              />
            }
            title={'Delete Card'}
          />
        </Modal>
      </div>
    </TD>
  )
}
