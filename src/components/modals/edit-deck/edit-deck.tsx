import { SubmitHandler, useForm } from 'react-hook-form'

import { namePackSchema, privateCheckboxSchema } from '@/components'
import { Button } from '@/components/ui/button'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { ImageUploader } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './edit-deck.module.scss'

const addNewDeckSchema = z.object({
  image: z.any(),
  isPrivate: privateCheckboxSchema,
  name: namePackSchema,
})

export type CreateDeckFormValues = z.infer<typeof addNewDeckSchema>

type AddNewDeckProps = {
  cover?: string | undefined
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploader
          imageKey={'image'}
          initialImageURL={cover}
          label={'Choose image'}
          register={register}
          setValue={setValue}
        />
        <div className={s.wrapperForm}>
          <ControlledTextField
            control={control}
            errorMessage={errors.name?.message}
            fullWidth
            label={'Name deck'}
            name={'name'}
          />
          <ControlledCheckBox control={control} label={'Private deck'} name={'isPrivate'} />
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
    </>
  )
}
