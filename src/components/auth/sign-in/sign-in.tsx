import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './sign-in.module.scss'

import { Card } from '@/components/ui/card'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box/controlled-check-box.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'
import { Typography } from '@/components/ui/typography'

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
        <Typography variant={'h2'} className={s.title}>
          Sign In
        </Typography>

        {/*<DevTool control={control} />*/}
        <ControlledTextField
          fullWidth
          className={s.email}
          name={'email'}
          control={control}
          label={'Email'}
          errorMessage={errors.email?.message}
        />
        <ControlledTextField
          fullWidth
          className={s.password}
          name={'password'}
          control={control}
          label={'Password'}
          errorMessage={errors.password?.message}
        />
        <ControlledCheckBox
          label={'Remember me'}
          control={control}
          name={'rememberMe'}
          className={s.checkBox}
        />
        <Typography variant={'body2'} className={s.forgotPassword}>
          Forgot Password?
        </Typography>
        <Button type="submit" fullWidth className={s.button}>
          Sign In
        </Button>
        <Typography variant={'body2'} className={s.haveAnAccount}>
          Don&apos;t have an account?
        </Typography>
        <Button variant={'link'} type={'button'} className={s.signUp}>
          Sign Up
        </Button>
      </Card>
    </form>
  )
}
