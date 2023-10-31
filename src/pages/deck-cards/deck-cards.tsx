import { Link } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import DotsImg from '@/assets/dots-img'
import { EditImg } from '@/assets/edit-img'
import EllipseImg from '@/assets/ellipse-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import StarFillImg from '@/assets/star-fill-img'
import StarImg from '@/assets/star-img'
import { TrashImg } from '@/assets/trash-img'
import { ModalForCards } from '@/components/modal-for-cards'
import { AddAndEditCard } from '@/components/modal-for-cards/add-and-edit-card'
import { Delete } from '@/components/modal-for-cards/delete'
import { Button } from '@/components/ui/button'
import { DropDown, DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { Body, Row, TD, Table } from '@/components/ui/tables'
import { TableHeader } from '@/components/ui/tables/table-header'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'

import s from './deck-cards.module.scss'

export const DeckCards = () => {
  const items = [
    {
      answer: 'This is how "This" works in JavaScript',
      id: '1',
      question: 'How "This" works in JavaScript?',
      updated: '18.03.2021',
    },
    {
      answer: 'This is how "This" works in JavaScript',
      id: '2',
      question: 'How "This" works in JavaScript?',
      updated: '18.03.2021',
    },
    {
      answer: 'This is how "This" works in JavaScript',
      id: '3',
      question: 'How "This" works in JavaScript?',
      updated: '18.03.2021',
    },
    {
      answer: 'This is how "This" works in JavaScript',
      id: '4',
      question: 'How "This" works in JavaScript?',
      updated: '18.03.2021',
    },
  ]

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

  return (
    <>
      <Link className={s.linkBack} to={'/'}>
        <ArrowBackImg />
        <Typography className={s.back} variant={'body2'}>
          Back to Packs List
        </Typography>
      </Link>
      <div className={s.header}>
        <div>
          <Typography className={s.title} variant={'large'}>
            My Pack
          </Typography>
          <DropDown trigger={<TriggerMore />}>
            <DropDownItem icon={<PlayCircleImg />} text={'Learn'} />
            <DropDownItem icon={<EditImg />} text={'Edit'} />
            <DropDownItem icon={<TrashImg />} lastItem text={'Delete'} />
          </DropDown>
        </div>

        <Modal trigger={<Button variant={'primary'}>Add New Card</Button>}>
          <ModalForCards body={<AddAndEditCard variant={'add'} />} title={'Add New Card'} />
        </Modal>
      </div>
      <TextField className={s.input} fullWidth placeholder={'Input search'} type={'search'} />
      <Table>
        <TableHeader className={s.tableHeader} columns={columns} />
        <Body>
          {items.map(item => (
            <Row key={item.id}>
              <TD>{item.question}</TD>
              <TD>{item.answer}</TD>
              <TD>{item.updated}</TD>
              <TD>
                <div className={s.stars}>
                  <StarFillImg />
                  <StarFillImg />
                  <StarFillImg />
                  <StarFillImg />
                  <StarImg />
                </div>
              </TD>
              <TD>
                <div className={s.buttons}>
                  <Modal trigger={<EditImg className={s.icon} />}>
                    <ModalForCards body={<AddAndEditCard variant={'edit'} />} title={'Edit Card'} />
                  </Modal>
                  <Modal trigger={<TrashImg className={s.icon} />}>
                    <ModalForCards body={<Delete variant={'card'} />} title={'Delete Card'} />
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
