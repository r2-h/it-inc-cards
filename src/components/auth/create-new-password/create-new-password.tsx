import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { passwordValidation } from '../validation-schemas'

const passwordSchema = z.object({
  password: passwordValidation,
})

export type CreatePasswordFormValues = z.infer<typeof passwordSchema>

type CreateNewPasswordProps = {
  onSubmit?: any
}

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />

      <Card className={s.wrapper}>
        <Typography className={s.header} variant={'large'}>
          Create new password
        </Typography>
        <ControlledTextField
          control={control}
          errorMessage={errors.password?.message}
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
