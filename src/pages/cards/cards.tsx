import { Link, useParams } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import DotsImg from '@/assets/dots-img'
import { EditImg } from '@/assets/edit-img'
import EllipseImg from '@/assets/ellipse-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
import { ModalForCards } from '@/components/modal-for-cards'
import { AddAndEditCard, AddCardsFormValues } from '@/components/modal-for-cards/add-and-edit-card'
import { Delete } from '@/components/modal-for-cards/delete'
import { Button } from '@/components/ui/button'
import { DropDown, DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { Body, Row, TD, Table } from '@/components/ui/tables'
import { Grade } from '@/components/ui/tables/grade'
import { TableHeader } from '@/components/ui/tables/table-header'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsInDeckQuery,
  useUpdateCardMutation,
} from '@/services/cards/cards-api'

import s from './cards.module.scss'

export const Cards = () => {
  const columns = [
    {
      key: 'question',
      sortable: false,
      title: 'Question',
    },
    {
      key: 'answer',
      sortable: false,
      title: 'Answer',
    },
    {
      key: 'updated',
      sortable: true,
      title: 'Last Updated',
    },
    {
      key: 'grade',
      sortable: false,
      title: 'Grade',
    },
  ]
  const { id } = useParams<{ id: string }>()

  const cards = useGetCardsInDeckQuery({ id: id ?? '' })
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  const addCardHandler = (data: AddCardsFormValues) => {
    createCard({ answer: data.answer, deckId: id, question: data.question })
  }

  const editCardHandler = (id: string, data: AddCardsFormValues) => {
    updateCard({ answer: data.answer, id, question: data.question })
  }

  const deleteCardHandler = (id: string) => {
    deleteCard({ id })
  }

  return (
    <>
      <Link className={s.linkBack} to={'/'}>
        <ArrowBackImg />
        <Typography className={s.back} variant={'body2'}>
          Back to Decks List
        </Typography>
      </Link>
      <div className={s.header}>
        <div>
          <Typography className={s.title} variant={'large'}>
            My Deck
          </Typography>
          <DropDown trigger={<TriggerMore />}>
            <DropDownItem icon={<PlayCircleImg />} text={'Learn'} />
            <DropDownItem icon={<EditImg />} text={'Edit'} />
            <DropDownItem icon={<TrashImg />} lastItem text={'Delete'} />
          </DropDown>
        </div>

        <Modal trigger={<Button variant={'primary'}>Add New Card</Button>}>
          <ModalForCards
            body={<AddAndEditCard onSubmit={addCardHandler} variant={'add'} />}
            title={'Add New Card'}
          />
        </Modal>
      </div>
      <TextField className={s.input} fullWidth placeholder={'Input search'} type={'search'} />
      <Table>
        <TableHeader className={s.tableHeader} columns={columns} />
        <Body>
          {cards?.data?.items.map(item => (
            <Row key={item?.id}>
              <TD>{item?.question}</TD>
              <TD>{item?.answer}</TD>
              <TD>{new Date(item?.updated).toLocaleDateString()}</TD>
              <TD>
                <Grade />
              </TD>
              <TD>
                <div className={s.buttons}>
                  <Modal trigger={<EditImg className={s.icon} />}>
                    <ModalForCards
                      body={
                        <AddAndEditCard
                          onSubmit={(data: AddCardsFormValues) => {
                            editCardHandler(item.id, data)
                          }}
                          variant={'edit'}
                        />
                      }
                      title={'Edit Card'}
                    />
                  </Modal>
                  <Modal trigger={<TrashImg className={s.icon} />}>
                    <ModalForCards
                      body={
                        <Delete
                          callback={() => {
                            deleteCardHandler(item.id)
                          }}
                          variant={'card'}
                        />
                      }
                      title={'Delete Card'}
                    />
                  </Modal>
                </div>
              </TD>
            </Row>
          ))}
        </Body>
      </Table>
    </>
  )
}

export const TriggerMore = () => {
  return (
    <div className={s.img}>
      <EllipseImg className={s.iconEllipse} />
      <DotsImg className={s.iconDots} />
    </div>
  )
}
