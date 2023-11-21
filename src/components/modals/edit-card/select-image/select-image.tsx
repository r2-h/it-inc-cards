import { FC } from 'react'
import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { ControlledTextField, Typography } from '@/components'
import { ImageUploader } from '@/utils'

import s from './select-image.module.scss'

export const SelectImage: FC<SelectImageProps> = ({
  card,
  control,
  errors,
  register,
  setValue,
}) => {
  return (
    <div className={s.wrapper}>
      <Typography variant={'subtitle2'}>Question</Typography>
      <ImageUploader
        imageKey={'questionImg'}
        initialImageURL={card?.questionImg}
        label={'Choose question image'}
        register={register}
        setValue={setValue}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.question?.message}
        fullWidth
        label={'Question'}
        name={'question'}
      />

      <Typography variant={'subtitle2'}>Answer</Typography>
      <ImageUploader
        imageKey={'answerImg'}
        initialImageURL={card?.answerImg}
        label={'Choose answer image'}
        register={register}
        setValue={setValue}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.answer?.message}
        fullWidth
        label={'Answer'}
        name={'answer'}
      />
    </div>
  )
}
type SelectImageProps = {
  card: any
  control: Control<any>
  errors: FieldErrors<{
    answer: string
    answerImg?: any
    answerVideo: string
    question: string
    questionImg?: any
    questionVideo: string
  }>
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
}
