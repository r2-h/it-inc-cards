import { ChangeEvent, FC, useRef, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { EditImg } from '@/assets/edit-img'
import { Button, Typography } from '@/components'
import { AddCardsFormValues } from '@/components/modal-for-cards'

import s from './editImages.module.scss'

type EditImagesProps = {
  register: UseFormRegister<{
    answer: string
    answerImg?: any
    question: string
    questionImg?: any
  }>
  setSelectValue: (selectValue: string) => void
  setValue: UseFormSetValue<{
    answer: string
    answerImg?: any
    question: string
    questionImg?: any
  }>
  values: AddCardsFormValues
}

export const EditImages: FC<EditImagesProps> = ({ register, setSelectValue, setValue, values }) => {
  const [questionImageURL, setQuestionImageURL] = useState<string | undefined>(values.questionImg)
  const [answerImageURL, setAnswerImageURL] = useState<string | undefined>(values.answerImg)

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
    <>
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
      <Button onClick={() => setSelectValue('Text')} variant={'secondary'}>
        back
      </Button>
    </>
  )
}
