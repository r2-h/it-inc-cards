import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { answerAndQuestionSchema } from '@/components'
import { EditImages } from '@/components/modal-for-cards/edit-card/editImages'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Select } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './edit-card.module.scss'

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectValue === 'Image' && (
        <EditImages
          register={register}
          setSelectValue={setSelectValue}
          setValue={setValue}
          values={values}
        />
      )}

      {selectValue === 'Text' && (
        <>
          <div className={s.wrapperForm}>
            <Select
              className={s.select}
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
