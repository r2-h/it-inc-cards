import { FC, useState } from 'react'

import ava from '@/assets/ava.jpg'
import { EditImg } from '@/assets/edit-img'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useUpdateUserMutation } from '@/services'
import { InputTypeFile } from '@/utils/input-type-file'

import s from './edit-profile.module.scss'

import { EditModeOff } from './edit-mode-off'
import { EditModeOn } from './edit-mode-on'

type EditProfileProps = {
  avatar?: File | undefined
  email?: string
  name?: string
  onSubmit?: any
}

export const EditProfile: FC<EditProfileProps> = ({ avatar, email, name, onSubmit }) => {
  const [editMode, setEditMode] = useState(false)
  const [updateProfile] = useUpdateUserMutation()

  return (
    <Card className={s.wrapper}>
      <Typography className={s.header} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatar}>
        <div className={s.img} style={{ backgroundImage: `url(${avatar ?? ava})` }} />
        <InputTypeFile className={s.buttonAvatar} setImage={updateProfile} trigger={<EditImg />} />
      </div>
      {editMode && <EditModeOn defaultValue={name} onSubmit={onSubmit} />}
      {!editMode && <EditModeOff email={email} name={name} setEditMode={setEditMode} />}
    </Card>
  )
}
