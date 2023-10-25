import { FC, ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-profile.module.scss'

const nameSchema = z.object({
  name: z.string().min(3).max(10),
})

export type FormValues = z.infer<typeof nameSchema>

type EditProfileProps = {
  avatar?: ReactNode
  onSubmit?: any
}

export const EditProfile: FC<EditProfileProps> = ({ avatar, onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(nameSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Personal Information
        </Typography>
        <div className={s.avatar}>{avatar}</div>
        <ControlledTextField
          className={s.input}
          control={control}
          errorMessage={errors.name?.message}
          fullWidth
          label={'Nickname'}
          name={'name'}
        />

        <Button className={s.button} fullWidth type={'submit'}>
          Save Changes
        </Button>
      </Card>
    </form>
  )
}
