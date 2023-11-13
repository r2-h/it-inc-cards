import { Link, useParams } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import { Card, Typography } from '@/components'
import { LearnContent } from '@/pages/learn-deck/learn-content'
import { useGetDeckQuery } from '@/services'

import s from './learn-deck.module.scss'

export const LearnDeck = () => {
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })

  return (
    <>
      <Link className={s.linkBack} to={'/'}>
        <ArrowBackImg />
        <Typography className={s.back} variant={'body2'}>
          Back to Decks List
        </Typography>
      </Link>
      <Card className={s.wrapper}>
        <Typography className={s.title} variant={'large'}>
          Learn {deck?.name}
        </Typography>
        <LearnContent />
      </Card>
    </>
  )
}
