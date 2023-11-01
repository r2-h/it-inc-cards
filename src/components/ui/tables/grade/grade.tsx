import { FC } from 'react'

import { StarFilled } from '@/assets/star-fill-img'
import { StarEmpty } from '@/assets/star-img'

type GradeProps = {
  stars?: 0 | 1 | 2 | 3 | 4 | 5
}

export const Grade: FC<GradeProps> = ({ stars = 0 }) => {
  const emptyStars = 5 - stars

  return (
    <div>
      {[...Array(stars)].map((_, i) => (
        <StarFilled key={`filled${i}`} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarEmpty key={`empty${i}`} />
      ))}
    </div>
  )
}
