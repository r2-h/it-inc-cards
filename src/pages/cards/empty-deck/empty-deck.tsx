import { Typography } from '@/components'

import s from './empty-deck.module.scss'

import { AddNewCard } from '@/pages'

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
