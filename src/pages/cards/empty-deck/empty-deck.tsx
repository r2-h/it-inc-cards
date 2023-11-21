import { Typography } from '@/components'
import { AddNewCard } from '@/pages'

import s from './empty-deck.module.scss'

export const EmptyDeck = () => {
  return (
    <div className={s.wrapper}>
      <Typography variant={'body1'}>
        This deck is empty. Click add new card to fill this deck
      </Typography>
      <AddNewCard />
    </div>
  )
}
