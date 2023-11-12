import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DialogClose } from '@radix-ui/react-dialog'

import s from './delete.module.scss'

type DeleteProps = {
  callback?: any
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
          <Typography className={s.text} variant={'body1'}>
            All cards will be deleted.
          </Typography>
        )}
      </div>

      <div className={s.buttons}>
        <DialogClose>
          <Button variant={'secondary'}>Cancel</Button>
        </DialogClose>
        <DialogClose>
          <Button onClick={callback} variant={'primary'}>
            {`Delete ${variant}`}
          </Button>
        </DialogClose>
      </div>
    </>
  )
}
