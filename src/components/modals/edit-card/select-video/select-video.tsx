import { FC } from 'react'
import { Control, FieldErrors } from 'react-hook-form'

import { Button, ControlledTextField } from '@/components'

import s from './select-video.module.scss'
export const SelectVideo: FC<SelectVideoProps> = ({ control, errors, setSelectValue }) => {
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
        errorMessage={errors.questionVideo?.message}
        fullWidth
        label={'Answer Video URL'}
        name={'answerVideo'}
      />
      <div className={s.backButton}>
        <Button onClick={() => setSelectValue('Text')} variant={'secondary'}>
          back
        </Button>
      </div>
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
