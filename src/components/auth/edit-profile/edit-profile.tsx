import { FC, ReactNode, useState } from 'react'

import { EditImg } from '@/assets/edit-img'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './edit-profile.module.scss'

import { EditModeOff } from './edit-mode-off'
import { EditModeOn } from './edit-mode-on'

type EditProfileProps = {
  avatar?: ReactNode
  email?: string
  name?: string
  onSubmit?: any
}

export const EditProfile: FC<EditProfileProps> = ({ avatar, email, name, onSubmit }) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  return (
    <Card className={s.wrapper}>
      <Typography className={s.header} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatar}>
        {avatar}
        {!editMode && (
          <Button className={s.buttonAvatar} type={'button'} variant={'secondary'}>
            <EditImg />
          </Button>
        )}
      </div>
      {editMode && <EditModeOn onSubmit={onSubmit} />}
      {!editMode && <EditModeOff email={email} name={name} setEditMode={setEditMode} />}
    </Card>
  )
}
