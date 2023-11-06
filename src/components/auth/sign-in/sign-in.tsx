import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Card } from '@/components/ui/card'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button } from '../../ui/button'
import { emailValidation, passwordValidation, rememberMeValidation } from '../validation-schemas'

const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: rememberMeValidation,
})

export type SignInFormValues = z.infer<typeof loginSchema>

type SignInProps = {
  onSubmit?: any
}

export const SignIn: FC<SignInProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
  })
  const navigate = useNavigate()

  const signUpHandler = () => {
    navigate('/sign-up')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Card className={s.container}>
        <Typography className={s.title} variant={'large'}>
          Sign In
        </Typography>

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
          type={'password'}
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
        <Typography className={s.haveAnAccount} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Button
          as={'a'}
          className={s.signUp}
          onClick={signUpHandler}
          type={'button'}
          variant={'link'}
        >
          Sign Up
        </Button>
      </Card>
    </form>
  )
}
