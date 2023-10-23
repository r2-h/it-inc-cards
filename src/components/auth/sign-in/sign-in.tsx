import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Card } from '@/components/ui/card'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field'
import { Typography } from '@/components/ui/typography'
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
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={s.container}>
        <Typography className={s.title} variant={'h2'}>
          Sign In
        </Typography>

        {/*<DevTool control={control} />*/}
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
        <Typography className={s.haveAnAccount} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Button className={s.signUp} type={'button'} variant={'link'}>
          Sign Up
        </Button>
      </Card>
    </form>
  )
}
