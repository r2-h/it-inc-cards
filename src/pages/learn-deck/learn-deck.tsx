import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ArrowBackImg from '@/assets/arrow-back-img'
import CloseImg from '@/assets/close-img'
import { Card, Typography } from '@/components'
import { LearnContent } from '@/pages/learn-deck/learn-content'
import { useGetDeckQuery } from '@/services'

import s from './learn-deck.module.scss'

export const LearnDeck = () => {
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const navigate = useNavigate()
  const closeHandler = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'Enter') {
      navigate(`/cards/${id}`)
    }
  }

  return (
    <>
      <Link className={s.linkBack} to={'/'}>
        <ArrowBackImg />
        <Typography variant={'body2'}>Back to Decks List</Typography>
      </Link>
      <Card className={s.wrapper}>
        <Typography className={s.title} variant={'large'}>
          Learn {deck?.name}
        </Typography>
        <CloseImg
          className={s.close}
          onClick={() => navigate(`/cards/${id}`)}
          onKeyDown={closeHandler}
          tabIndex={0}
        />
        <LearnContent />
      </Card>
    </>
  )
}
