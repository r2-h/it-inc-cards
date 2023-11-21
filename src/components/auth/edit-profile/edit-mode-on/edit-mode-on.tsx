import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button, ControlledTextField, nameSchema } from '@/components'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-mode-on.module.scss'

export type EditProfileFormValues = z.infer<typeof nameSchema>

type EditModeOnProps = {
  defaultValue?: string
  onSubmit?: any
}

export const EditModeOn: FC<EditModeOnProps> = ({ defaultValue, onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      name: defaultValue ?? '',
    },
    resolver: zodResolver(nameSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <ControlledTextField
        className={s.input}
        control={control}
        errorMessage={errors.name?.message}
        fullWidth
        label={'Nickname'}
        name={'name'}
      />
      <Button className={s.buttonSave} fullWidth>
        Save Changes
      </Button>
    </form>
  )
}
