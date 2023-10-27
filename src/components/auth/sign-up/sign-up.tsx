import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { emailValidation, passwordValidation } from '../validation-schemas'

const loginSchema = z.object({
  confirmPassword: passwordValidation,
  email: emailValidation,
  password: passwordValidation,
})

export type FormValues = z.infer<typeof loginSchema>
type SignOutProps = {
  onSubmit?: any
}

export const SignUp: FC<SignOutProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Sign Up
        </Typography>

        <ControlledTextField
          className={s.input}
          control={control}
          errorMessage={errors.email?.message}
          fullWidth
          label={'Email'}
          name={'email'}
        />
        <ControlledTextField
          className={s.input}
          control={control}
          errorMessage={errors.password?.message}
          fullWidth
          label={'Password'}
          name={'password'}
          type={'password'}
        />

        <ControlledTextField
          className={s.input}
          control={control}
          errorMessage={errors.confirmPassword?.message}
          fullWidth
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
        />

        <Button className={s.button} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <Typography className={s.text} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button className={s.link} type={'button'} variant={'link'}>
          Sign In
        </Button>
      </Card>
    </form>
  )
}
