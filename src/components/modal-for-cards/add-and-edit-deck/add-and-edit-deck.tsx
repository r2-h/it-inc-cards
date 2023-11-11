import { ChangeEvent, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EditImg } from '@/assets/edit-img'
import { Typography, namePackSchema, privateCheckboxSchema } from '@/components'
import { Button } from '@/components/ui/button'
import { ControlledCheckBox } from '@/components/ui/controlled/controlled-check-box'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './add-and-edit-deck.module.scss'

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

export const AddAndEditDeck = ({
  cover,
  isPrivate = true,
  name = '',
  onSubmit,
  variant,
}: AddNewDeckProps) => {
  const textButton = variant === 'add' ? 'Add New Deck' : 'Edit Deck'
  const [imageURL, setImageURL] = useState<string | undefined>(cover)
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

  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setImageURL(URL.createObjectURL(file))
      setValue('image', file)
    }
  }
  const selectFileHandler = () => {
    fileInputRef && fileInputRef.current?.click()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.image} style={{ backgroundImage: `url(${imageURL})` }}>
          <input
            {...register('image')}
            id={'edit'}
            onChange={uploadHandler}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type={'file'}
          />
        </div>
        <div className={s.chooseFileContainer}>
          <div className={s.editWrapper} tabIndex={0}>
            <EditImg className={s.editIcon} onClick={selectFileHandler} />
          </div>
          <Typography as={'label'} className={s.editLabel} htmlFor={'edit'} variant={'body2'}>
            Choose file
          </Typography>
        </div>
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
