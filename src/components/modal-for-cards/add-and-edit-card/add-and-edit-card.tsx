import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditImg } from '@/assets/edit-img'
import { Typography, answerAndQuestionSchema } from '@/components'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Select } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './add-and-edit-card.module.scss'

const addNewCardSchema = z.object({
  answer: answerAndQuestionSchema,
  question: answerAndQuestionSchema,
  questionImg: z.any(),
})

export type AddCardsFormValues = z.infer<typeof addNewCardSchema>

type AddNewCardProps = {
  onSubmit?: any
  values: AddCardsFormValues
  variant: 'add' | 'edit'
}

export const AddAndEditCard = ({ onSubmit, values, variant }: AddNewCardProps) => {
  const [questionImageURL, setQuestionImageURL] = useState<string | undefined>(values.questionImg)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AddCardsFormValues>({
    resolver: zodResolver(addNewCardSchema),
    values: {
      answer: values.answer,
      question: values.question,
    },
  })

  const options = [
    { id: '1', value: 'Text' },
    { id: '2', value: 'Image' },
    { id: '3', value: 'Video' },
  ]
  const textButton = variant === 'add' ? 'Add New Card' : 'Save Changes'

  const questionInputRef = useRef<HTMLInputElement>(null)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setQuestionImageURL(URL.createObjectURL(file))
      setValue('questionImg', file)
    }
  }
  const selectFileHandler = () => {
    questionInputRef && questionInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.image} style={{ backgroundImage: `url(${questionImageURL})` }}>
        <input
          {...register('questionImg')}
          id={'edit'}
          onChange={uploadHandler}
          ref={questionInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
      <div className={s.chooseFileContainer}>
        <div className={s.editWrapper} tabIndex={0}>
          <EditImg className={s.editIcon} onClick={selectFileHandler} />
        </div>
        <Typography as={'label'} className={s.editLabel} htmlFor={'edit'} variant={'body2'}>
          Choose question image
        </Typography>
      </div>

      <div className={s.wrapperForm}>
        <Select
          className={s.select}
          defaultValue={'Text'}
          fullWidth
          label={'Choose a question format'}
          onChangeValue={() => {}}
          options={options}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.question?.message}
          fullWidth
          label={'Question'}
          name={'question'}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.answer?.message}
          fullWidth
          label={'Answer'}
          name={'answer'}
        />
      </div>
      <div className={s.buttons}>
        <Button type={'button'} variant={'secondary'}>
          <DialogClose>Cancel</DialogClose>
        </Button>
        <Button type={'submit'} variant={'primary'}>
          {textButton}
        </Button>
      </div>
    </form>
  )
}
