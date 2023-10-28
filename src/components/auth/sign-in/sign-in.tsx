import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Card } from '@/components/ui/card'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { useLoginMutation } from '@/services/auth-api'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button } from '../../ui/button'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>

type SignInProps = {
  onSubmit?: any
}

export const SignIn: FC<SignInProps> = ({ onSubmit }) => {
  const [login, { error }] = useLoginMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  if (error) {
    if (
      'status' in error &&
      typeof error.data === 'object' &&
      error.data &&
      'message' in error.data
    ) {
      setError('password', {
        message: error.data.message as string,
        type: 'custom',
      })
    }
  }

  return (
    <>
      <DevTool control={control} />
      <Card className={s.container}>
        <Typography className={s.title} variant={'h2'}>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit(login)}>
          <ControlledTextField
            className={s.email}
            control={control}
            errorMessage={errors.email?.message}
            fullWidth
            label={'Email'}
            name={'email'}
          />
          <ControlledTextField
            className={s.password}
            control={control}
            errorMessage={errors.password?.message}
            fullWidth
            label={'Password'}
            name={'password'}
          />
          <ControlledCheckBox
            className={s.checkBox}
            control={control}
            label={'Remember me'}
            name={'rememberMe'}
          />
          <Typography className={s.forgotPassword} variant={'body2'}>
            Forgot Password?
          </Typography>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={s.haveAnAccount} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Button className={s.signUp} type={'button'} variant={'link'}>
          Sign Up
        </Button>
      </Card>
    </>
  )
}
