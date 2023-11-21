import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditImg } from '@/assets/edit-img'
import LogoutImg from '@/assets/logout-img'
import { Button, Typography } from '@/components'
import { useLogoutMutation } from '@/services'
import { DialogClose } from '@radix-ui/react-dialog'

import s from './edit-mode-off.module.scss'

type EditModeOffProps = {
  email?: string
  name?: string
  setEditMode: (editMode: boolean) => void
}

export const EditModeOff: FC<EditModeOffProps> = ({ email, name, setEditMode }) => {
  const [logOut] = useLogoutMutation()
  const navigate = useNavigate()
  const switchOnEditModeHandler = () => {
    setEditMode(true)
  }

  const logOutHandler = () => {
    logOut()
    navigate('/login')
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
          as={'span'}
          className={s.buttonLogout}
          fullWidth={false}
          onClick={logOutHandler}
          variant={'secondary'}
        >
          <LogoutImg className={s.iconLogout} /> Logout
        </Button>
      </DialogClose>
    </>
  )
}
