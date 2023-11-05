import { FC, ReactNode, useState } from 'react'

import { EditImg } from '@/assets/edit-img'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { authActions } from '@/services'
import { InputTypeFile } from '@/utils'

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
  const setAvatar = authActions.setAvatar

  return (
    <Card className={s.wrapper}>
      <Typography className={s.header} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatar}>
        <div className={s.img} style={{ backgroundImage: `url(${avatar})` }} />
        <InputTypeFile buttonImg={<EditImg />} setImage={setAvatar} />
      </div>
      {editMode && <EditModeOn onSubmit={onSubmit} />}
      {!editMode && <EditModeOff email={email} name={name} setEditMode={setEditMode} />}
    </Card>
  )
}
