import DotsImg from '@/assets/dots-img'
import EllipseImg from '@/assets/ellipse-img'

import s from './triggerMore.module.scss'

export const TriggerMore = () => {
  return (
    <div className={s.img}>
      <EllipseImg className={s.iconEllipse} />
      <DotsImg className={s.iconDots} />
    </div>
  )
}
