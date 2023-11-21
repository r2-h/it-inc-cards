import { ReactNode } from 'react'

import CloseImg from '@/assets/close-img'
import { Card, Typography } from '@/components'
import { DialogClose } from '@radix-ui/react-dialog'

import s from './modal-wrapper.module.scss'

type ModalForCardsProps = {
  body: ReactNode
  title: string
}

export const ModalWrapper = ({ body, title }: ModalForCardsProps) => {
  return (
    <Card className={s.wrapper}>
      <div className={s.headerWrapper}>
        <Typography className={s.header} variant={'h2'}>
          {title}
        </Typography>
        <DialogClose className={s.dialogClose}>
          <CloseImg />
        </DialogClose>
      </div>
      {body}
    </Card>
  )
}
