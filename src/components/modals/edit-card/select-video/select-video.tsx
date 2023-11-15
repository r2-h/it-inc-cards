import { FC } from 'react'
import { Control, FieldErrors } from 'react-hook-form'

import { ControlledTextField } from '@/components'

import s from './select-video.module.scss'

export const SelectVideo: FC<SelectVideoProps> = ({ control, errors }) => {
  return (
    <div className={s.wrapper}>
      <ControlledTextField
        control={control}
        errorMessage={errors.questionVideo?.message}
        fullWidth
        label={'Question Video URL'}
        name={'questionVideo'}
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
        errorMessage={errors.answerVideo?.message}
        fullWidth
        label={'Answer Video URL'}
        name={'answerVideo'}
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
type SelectVideoProps = {
  control: Control<any>
  errors: FieldErrors<{
    answer: string
    answerImg?: any
    answerVideo: string
    question: string
    questionImg?: any
    questionVideo: string
  }>
  setSelectValue: (selectValue: string) => void
}
