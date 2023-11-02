import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DialogClose } from '@radix-ui/react-dialog'

import s from './delete.module.scss'

type DeleteProps = {
  callback?: any
  variant: 'card' | 'deck'
}
export const Delete = ({ callback, variant }: DeleteProps) => {
  const text = variant === 'card' ? 'Card' : 'Deck'

  return (
    <>
      <div className={s.wrapperText}>
        <Typography className={s.text} variant={'body1'}>
          Do you really want to remove{' '}
          <Typography className={s.text} variant={'subtitle2'}>
            {text} Name?
          </Typography>
        </Typography>

        <Typography className={s.text} variant={'body1'}>
          All cards will be deleted.
        </Typography>
      </div>

      <div className={s.buttons}>
        <DialogClose>
          <Button variant={'secondary'}>Cancel</Button>
        </DialogClose>
        <Button onClick={callback} variant={'primary'}>
          Delete {text}
        </Button>
      </div>
    </>
  )
}
