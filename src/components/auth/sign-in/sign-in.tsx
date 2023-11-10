import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Card,
  ControlledCheckBox,
  ControlledTextField,
  Typography,
  emailValidation,
  passwordValidation,
  rememberMeValidation,
} from '@/components'
import { useAppSelector } from '@/services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: rememberMeValidation,
})

export type SignInFormValues = z.infer<typeof loginSchema>

type SignInProps = {
  onSubmit: SubmitHandler<SignInFormValues>
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

  const error = useAppSelector(state => state.auth.error)

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

        <div className={s.wrapper}>
          <ControlledTextField
            control={control}
            errorMessage={errors.email?.message ?? error}
            fullWidth
            label={'Email'}
            name={'email'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.password?.message ?? error}
            fullWidth
            label={'Password'}
            name={'password'}
            type={'password'}
          />
        </div>
        <ControlledCheckBox
          className={s.checkBox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Typography
          as={'a'}
          className={s.forgotPassword}
          href={'/forgot-password'}
          variant={'body2'}
        >
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
