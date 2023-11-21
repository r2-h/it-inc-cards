import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Card, ControlledTextField, Typography, emailSchema } from '@/components'
import { useAppSelector } from '@/services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'

export type ForgotPasswordFormValues = z.infer<typeof emailSchema>

type ForgotPasswordProps = {
  onSubmit: SubmitHandler<ForgotPasswordFormValues>
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(emailSchema) })
  const error = useAppSelector(state => state.auth.error)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />

      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Forgot your password?
        </Typography>
        <ControlledTextField
          control={control}
          errorMessage={errors.email?.message ?? error}
          fullWidth
          label={'Email'}
          name={'email'}
        />
        <Typography className={s.description} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth>
          Send Instructions
        </Button>
        <Typography className={s.rememberPassword} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button as={'a'} className={s.link} href={'/login'} type={'button'} variant={'link'}>
          Try logging in
        </Button>
      </Card>
    </form>
  )
}
