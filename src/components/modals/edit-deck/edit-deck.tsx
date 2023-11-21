import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ControlledCheckBox, ControlledTextField, addNewDeckSchema } from '@/components'
import { ImageUploader } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './edit-deck.module.scss'

export type CreateDeckFormValues = z.infer<typeof addNewDeckSchema>

type AddNewDeckProps = {
  cover?: Blob | string | undefined
  isPrivate?: boolean
  name?: string
  onSubmit: SubmitHandler<{ image?: any; isPrivate: boolean; name: string }>
  variant?: 'add' | 'edit'
}

export const EditDeck = ({
  cover,
  isPrivate = true,
  name = '',
  onSubmit,
  variant,
}: AddNewDeckProps) => {
  const textButton = variant === 'add' ? 'Add New Deck' : 'Edit Deck'

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CreateDeckFormValues>({
    resolver: zodResolver(addNewDeckSchema),
    values: {
      image: null,
      isPrivate: isPrivate,
      name: name,
    },
  })

  return (
    <form className={s.wrapperForm} onSubmit={handleSubmit(onSubmit)}>
      <ImageUploader
        imageKey={'image'}
        initialImageURL={cover}
        label={'Choose image'}
        register={register}
        setValue={setValue}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.name?.message}
        fullWidth
        label={'Name deck'}
        name={'name'}
      />
      <ControlledCheckBox control={control} label={'Private deck'} name={'isPrivate'} />
      <div className={s.buttons}>
        <DialogClose>
          <Button as={'span'} variant={'secondary'}>
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
