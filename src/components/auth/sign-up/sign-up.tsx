import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Card, ControlledTextField, Typography, signUpSchema } from '@/components'
import { useAppSelector } from '@/services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

export type SignUpFormValues = z.infer<typeof signUpSchema>
type SignOutProps = {
  onSubmit: SubmitHandler<SignUpFormValues>
}

export const SignUp: FC<SignOutProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })
  const navigate = useNavigate()
  const error = useAppSelector(state => state.auth.error)

  const signInHandler = () => {
    navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Sign Up
        </Typography>

        <div className={s.inputs}>
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

          <ControlledTextField
            control={control}
            errorMessage={errors.confirmPassword?.message ?? error}
            fullWidth
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
        </div>

        <Button className={s.button} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <Typography className={s.text} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button
          as={'a'}
          className={s.link}
          onClick={signInHandler}
          type={'button'}
          variant={'link'}
        >
          Sign In
        </Button>
      </Card>
    </form>
  )
}
