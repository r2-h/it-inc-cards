import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Grade, Typography } from '@/components'
import { LearnForm } from '@/pages/learn-deck/learn-form'
import { useLearnCardsQuery, useSaveGradeMutation } from '@/services'

import s from './learn-content.module.scss'

export const LearnContent = () => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { data: card, refetch } = useLearnCardsQuery({ id: id ?? '' })
  const [saveGrade] = useSaveGradeMutation()

  const onSubmit = (args: { cardId: string }) => {
    refetch()
    saveGrade({ cardId: card?.id ?? '', grade: Number(args.cardId), id: id ?? '' })
    setIsShowAnswer(false)
  }

  return (
    <>
      <Typography className={s.subtitle} variant={'subtitle1'}>
        Question:
      </Typography>
      {card?.questionImg && (
        <div
          className={s.image}
          style={{
            backgroundImage: `url(${card?.questionImg})`,
          }}
        />
      )}
      {card?.question && (
        <Typography className={s.text} variant={'body1'}>
          {card?.question}
        </Typography>
      )}

      <Typography className={s.description} variant={'body2'}>
        Количество попыток ответов на вопрос: {card?.shots}
      </Typography>
      <Grade stars={card?.grade}></Grade>

      {!isShowAnswer && (
        <Button className={s.button} fullWidth onClick={() => setIsShowAnswer(true)}>
          Show Answer
        </Button>
      )}
      {isShowAnswer && (
        <>
          <Typography className={s.subtitle} variant={'subtitle1'}>
            Answer:
          </Typography>
          {card?.answerImg && (
            <div
              className={s.image}
              style={{
                backgroundImage: `url(${card?.answerImg})`,
              }}
            />
          )}
          {card?.answer && (
            <Typography className={s.text} variant={'body1'}>
              {card?.answer}
            </Typography>
          )}

          <LearnForm grade={card?.grade} onSubmit={onSubmit} />
        </>
      )}
    </>
  )
}
