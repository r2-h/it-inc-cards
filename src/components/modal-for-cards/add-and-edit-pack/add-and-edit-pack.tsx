import { useForm } from 'react-hook-form'

import {
  namePackSchema,
  privateCheckboxSchema,
} from '@/components/modal-for-cards/validationSchemas'
import { Button } from '@/components/ui/button'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './add-and-edit-pack.module.scss'

const addNewPackSchema = z.object({
  namePack: namePackSchema,
  privatePack: privateCheckboxSchema,
})

export type FormValues = z.infer<typeof addNewPackSchema>

type AddNewPackProps = {
  onSubmit?: any
  variant: 'add' | 'edit'
}

export const AddAndEditPack = ({ onSubmit, variant }: AddNewPackProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(addNewPackSchema),
  })
  const textButton = variant === 'add' ? 'Add New Pack' : 'Edit Pack'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapperForm}>
        <ControlledTextField
          control={control}
          errorMessage={errors.namePack?.message}
          fullWidth
          label={'Name pack'}
          name={'namePack'}
        />
        <ControlledCheckBox control={control} label={'Private pack'} name={'privatePack'} />
      </div>
      <div className={s.buttons}>
        <DialogClose>
          <Button type={'button'} variant={'secondary'}>
            Cancel
          </Button>
        </DialogClose>
        <Button type={'submit'} variant={'primary'}>
          {textButton}
        </Button>
      </div>
    </form>
  )
}
