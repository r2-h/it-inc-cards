import { Typography } from '@/components'

import s from './empty-deck.module.scss'

import { AddNewCard } from '../add-new-card'

export const EmptyDeck = () => {
  return (
    <div className={s.wrapper}>
      <Typography className={s.text} variant={'body1'}>
        This deck is empty. Click add new card to fill this deck
      </Typography>
      <AddNewCard />
    </div>
  )
}
