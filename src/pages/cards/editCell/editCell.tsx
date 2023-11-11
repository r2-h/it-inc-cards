import { FC, useState } from 'react'

import { EditImg } from '@/assets/edit-img'
import { TrashImg } from '@/assets/trash-img'
import { ModalForCards } from '@/components/modal-for-cards'
import { AddAndEditCard, AddCardsFormValues } from '@/components/modal-for-cards/add-and-edit-card'
import { Delete } from '@/components/modal-for-cards/delete'
import { Modal } from '@/components/ui/modal'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards-api'
import { CardsResponse } from '@/services/cards/types'
import clsx from 'clsx'

import s from './editCell.module.scss'

type EditCellProps = {
  card: CardsResponse
  disabled?: boolean
  isEditable?: boolean
}

export const EditCell: FC<EditCellProps> = ({ card, disabled, isEditable }) => {
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const editCardHandler = (id: string, data: AddCardsFormValues) => {
    setIsOpenEdit(false)
    updateCard({ answer: data.answer, id, question: data.question, questionImg: data?.questionImg })
  }

  const deleteCardHandler = (id: string) => {
    deleteCard({ id })
  }
  const iconCN = clsx(s.icon, disabled && s.disabled)

  return (
    <div className={s.buttons}>
      <button onClick={() => setIsOpenEdit(isEditable ?? true)}>
        <EditImg className={iconCN} />
      </button>
      <Modal onOpenChange={() => setIsOpenEdit(false)} open={isOpenEdit}>
        <ModalForCards
          body={
            <AddAndEditCard
              onSubmit={(data: AddCardsFormValues) => {
                editCardHandler(card.id, data)
              }}
              values={{
                answer: card.answer,
                question: card.question,
                questionImg: card.questionImg,
              }}
              variant={'edit'}
            />
          }
          title={'Edit Card'}
        />
      </Modal>

      <Modal open={isEditable} trigger={<TrashImg className={iconCN} />}>
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
  )
}
