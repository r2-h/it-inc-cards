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
  answerImg: z.any(),
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
  const [answerImageURL, setAnswerImageURL] = useState<string | undefined>(values.answerImg)
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
  const answerInputRef = useRef<HTMLInputElement>(null)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setQuestionImageURL(URL.createObjectURL(file))
      setValue('questionImg', file)
    }
  }
  const uploadHandler2 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      setAnswerImageURL(URL.createObjectURL(file))
      setValue('answerImg', file)
    }
  }
  const selectFileHandler = () => {
    questionInputRef && questionInputRef.current?.click()
  }
  const selectFileHandler2 = () => {
    answerInputRef && answerInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.image} style={{ backgroundImage: `url(${questionImageURL})` }}>
        <input
          {...register('questionImg')}
          onChange={uploadHandler}
          ref={questionInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
      <div className={s.chooseFileContainer} onClick={selectFileHandler}>
        <div className={s.editWrapper} tabIndex={0}>
          <EditImg className={s.editIcon} />
        </div>
        <Typography as={'label'} className={s.editLabel} variant={'body2'}>
          Choose question image
        </Typography>
      </div>

      <div className={s.image} style={{ backgroundImage: `url(${answerImageURL})` }}>
        <input
          {...register('answerImg')}
          onChange={uploadHandler2}
          ref={answerInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
      <div className={s.chooseFileContainer} onClick={selectFileHandler2}>
        <div className={s.editWrapper} tabIndex={0}>
          <EditImg className={s.editIcon} />
        </div>
        <Typography as={'label'} className={s.editLabel} variant={'body2'}>
          Choose answer image
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
