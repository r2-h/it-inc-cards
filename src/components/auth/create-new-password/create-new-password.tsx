import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Card, ControlledTextField, Typography, passwordSchema } from '@/components'
import { useAppSelector } from '@/services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-new-password.module.scss'

export type CreatePasswordFormValues = z.infer<typeof passwordSchema>

type CreateNewPasswordProps = {
  onSubmit: SubmitHandler<CreatePasswordFormValues>
}

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  })
  const error = useAppSelector(state => state.auth.error)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />

      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Create new password
        </Typography>
        <ControlledTextField
          control={control}
          errorMessage={errors.password?.message ?? error}
          fullWidth
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Typography className={s.description} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth type={'submit'}>
          Create New Password
        </Button>
      </Card>
    </form>
  )
}
