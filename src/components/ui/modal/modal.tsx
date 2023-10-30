import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalProps = {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  trigger?: ReactNode
}
export const Modal: FC<ModalProps> = ({ children, onOpenChange, open, trigger }) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
