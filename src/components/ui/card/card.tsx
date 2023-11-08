import { ComponentPropsWithoutRef, FC } from 'react'

import s from './card.module.scss'

type CardProps = {} & ComponentPropsWithoutRef<'div'>
export const Card: FC<CardProps> = ({ className, ...rest }) => {
  return <div className={`${s.card} ${className}`} {...rest}></div>
}
