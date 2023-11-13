import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { AddCardsFormValues, Button, EditCard, Modal, ModalWrapper } from '@/components'
import { useCreateCardMutation } from '@/services'

export const AddNewCard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [createCard] = useCreateCardMutation()

  const { id } = useParams<{ id: string }>()
  const addCardHandler = (data: AddCardsFormValues) => {
    if (id) {
      setIsCreateModalOpen(false)
      createCard({
        answer: data.answer,
        answerImg: data.answerImg,
        answerVideo: data.answerVideo,
        id,
        question: data.question,
        questionImg: data.questionImg,
        questionVideo: data.questionVideo,
      })
    }
  }

  return (
    <>
      <Button onClick={() => setIsCreateModalOpen(true)} variant={'primary'}>
        Add New Card
      </Button>
      <Modal onOpenChange={() => setIsCreateModalOpen(false)} open={isCreateModalOpen}>
        <ModalWrapper
          body={<EditCard onSubmit={addCardHandler} variant={'add'} />}
          title={'Add New Card'}
        />
      </Modal>
    </>
  )
}
