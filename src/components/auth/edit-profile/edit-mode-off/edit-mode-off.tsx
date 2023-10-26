import { FC } from 'react'

import { EditImg } from '@/assets/edit-img'
import LogoutImg from '@/assets/logout-img'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './edit-mode-off.module.scss'

type EditModeOffProps = {
  email?: string
  name?: string
  setEditMode: (editMode: boolean) => void
}

export const EditModeOff: FC<EditModeOffProps> = ({ email, name, setEditMode }) => {
  const switchOnEditModeHandler = () => {
    setEditMode(true)
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
      <Button className={s.buttonLogout} fullWidth={false} type={'button'} variant={'secondary'}>
        <LogoutImg className={s.iconLogout} /> Logout
      </Button>
    </>
  )
}
