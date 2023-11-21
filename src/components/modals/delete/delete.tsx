import { Button, Typography } from '@/components'
import { DialogClose } from '@radix-ui/react-dialog'

import s from './delete.module.scss'

type DeleteProps = {
  callback?: () => void
  title: string
  variant: 'Card' | 'Deck'
}
export const Delete = ({ callback, title, variant }: DeleteProps) => {
  return (
    <>
      <div className={s.wrapperText}>
        <Typography className={s.text} variant={'body1'}>
          Do you really want to remove &quot;<b>{title}</b>&quot; ?
        </Typography>

        {variant === 'Deck' && (
          <Typography variant={'body1'}>All cards will be deleted.</Typography>
        )}
      </div>

      <div className={s.buttons}>
        <DialogClose>
          <Button as={'span'} variant={'secondary'}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose>
          <Button as={'span'} onClick={callback} variant={'primary'}>
            {`Delete ${variant}`}
          </Button>
        </DialogClose>
      </div>
    </>
  )
}
