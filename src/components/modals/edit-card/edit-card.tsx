import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Select } from '@/components/ui/select'
import { ImageUploader } from '@/utils/imageUploader'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './edit-card.module.scss'

import { answerAndQuestionSchema } from '..'

const addNewCardSchema = z.object({
  answer: answerAndQuestionSchema,
  answerImg: z.any(),
  question: answerAndQuestionSchema,
  questionImg: z.any(),
})

export type AddCardsFormValues = z.infer<typeof addNewCardSchema>

type AddNewCardProps = {
  onSubmit?: any
  values?: AddCardsFormValues
  variant: 'add' | 'edit'
}

export const EditCard = ({ onSubmit, values, variant }: AddNewCardProps) => {
  const [selectValue, setSelectValue] = useState('Text')
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AddCardsFormValues>({
    resolver: zodResolver(addNewCardSchema),
    values: {
      answer: values?.answer || '',
      question: values?.question || '',
    },
  })

  const options = [
    { id: '1', value: 'Text' },
    { id: '2', value: 'Image' },
    { id: '3', value: 'Video' },
  ]
  const textButton = variant === 'add' ? 'Add New Card' : 'Save Changes'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectValue === 'Image' && (
        <div className={s.uploaderContainer}>
          <div className={s.wrapper}>
            <ImageUploader
              imageKey={'questionImg'}
              initialImageURL={values?.questionImg}
              label={'Choose question image'}
              register={register}
              setValue={setValue}
            />
            <ImageUploader
              imageKey={'answerImg'}
              initialImageURL={values?.answerImg}
              label={'Choose answer image'}
              register={register}
              setValue={setValue}
            />
          </div>

          <div className={s.backButton}>
            <Button onClick={() => setSelectValue('Text')} variant={'secondary'}>
              back
            </Button>
          </div>
        </div>
      )}

      {selectValue === 'Text' && (
        <>
          <div className={s.wrapperForm}>
            <Select
              className={s.select}
              classNameViewport={s.viewport}
              defaultValue={'Text'}
              fullWidth
              label={'Choose a question format'}
              onChangeValue={value => {
                setSelectValue(value)
              }}
              options={options}
              value={selectValue}
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
        </>
      )}
    </form>
  )
}
