import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SelectVideo, videoSchema } from '@/components'
import { SelectImage } from '@/components/modals/edit-card/select-image'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Select } from '@/components/ui/select'
import { CardsResponse } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './edit-card.module.scss'

import { answerAndQuestionSchema } from '..'

const addNewCardSchema = z.object({
  answer: answerAndQuestionSchema,
  answerImg: z.any(),
  answerVideo: videoSchema,
  question: answerAndQuestionSchema,
  questionImg: z.any(),
  questionVideo: videoSchema,
})

export type AddCardsFormValues = z.infer<typeof addNewCardSchema>

type EditCardProps = {
  card?: CardsResponse
  onSubmit: (data: AddCardsFormValues) => void
  variant: 'add' | 'edit'
}

export const EditCard = ({ card, onSubmit, variant }: EditCardProps) => {
  const [selectValue, setSelectValue] = useState<string>('Text')
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<AddCardsFormValues>({
    resolver: zodResolver(addNewCardSchema),
    values: {
      answer: card?.answer || '',
      answerVideo: card?.answerVideo || '',
      question: card?.question || '',
      questionVideo: card?.questionVideo || '',
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
      <div className={s.wrapper}>
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
      </div>

      {selectValue === 'Text' && (
        <div className={s.wrapperForm}>
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
      )}
      {selectValue === 'Video' && (
        <SelectVideo control={control} errors={errors} setSelectValue={setSelectValue} />
      )}

      {selectValue === 'Image' && (
        <SelectImage
          card={card}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
        />
      )}

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
