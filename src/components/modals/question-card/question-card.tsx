import { FC } from 'react'

import { Button, Card, Typography } from '@/components'

import s from './question-card.module.scss'

type QuestionCardProps = {}

export const QuestionCard: FC<QuestionCardProps> = () => {
  return (
    <Card className={s.card}>
      <div>
        <Typography className={s.question}>Question:</Typography>
        <Typography className={s.question}>{}</Typography>
      </div>
      <Button>next</Button>
    </Card>
  )
}
