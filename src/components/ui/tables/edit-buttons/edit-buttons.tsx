import { FC } from 'react'

import { EditImg } from '@/assets/edit-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { TrashImg } from '@/assets/trash-img'
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
      <button className={buttonCN} onClick={deleteHandler}>
        <TrashImg />
      </button>
    </div>
  )
}
