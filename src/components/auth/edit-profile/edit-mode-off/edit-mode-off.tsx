import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditImg } from '@/assets/edit-img'
import LogoutImg from '@/assets/logout-img'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useSignOutMutation } from '@/services/auth/auth-api'
import { DialogClose } from '@radix-ui/react-dialog'

import s from './edit-mode-off.module.scss'

type EditModeOffProps = {
  email?: string
  name?: string
  setEditMode: (editMode: boolean) => void
}

export const EditModeOff: FC<EditModeOffProps> = ({ email, name, setEditMode }) => {
  const [logOut] = useSignOutMutation()
  const switchOnEditModeHandler = () => {
    setEditMode(true)
  }
  const navigate = useNavigate()

  const logOutHandler = () => {
    navigate('/login')
    logOut()
  }

  return (
    <>
      <div className={s.wrapper}>
        <Typography as={'h1'} className={s.name} variant={'h1'}>
          {name}
        </Typography>
        <button className={s.buttonName} onClick={switchOnEditModeHandler} type={'button'}>
          <EditImg />
        </button>
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <DialogClose>
        <Button
          className={s.buttonLogout}
          fullWidth={false}
          onClick={logOutHandler}
          type={'button'}
          variant={'secondary'}
        >
          <LogoutImg className={s.iconLogout} /> Logout
        </Button>
      </DialogClose>
    </>
  )
}
