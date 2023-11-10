import { FC } from 'react'

import { StarFilled } from '@/assets/star-fill-img'
import { StarEmpty } from '@/assets/star-img'

import s from './grade.module.scss'

type GradeProps = {
  stars?: number
}

export const Grade: FC<GradeProps> = ({ stars = 0 }) => {
  const emptyStars = 5 - stars

  return (
    <div className={s.wrapper}>
      {[...Array(stars)].map((_, i) => (
        <StarFilled key={`filled${i}`} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarEmpty key={`empty${i}`} />
      ))}
    </div>
  )
}
