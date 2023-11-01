import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { nameValidation } from '@/components/auth/validation-schemas'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-mode-on.module.scss'

const nameSchema = z.object({
  name: nameValidation,
})

export type FormValues = z.infer<typeof nameSchema>

type EditModeOnProps = {
  onSubmit?: any
}

export const EditModeOn: FC<EditModeOnProps> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
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