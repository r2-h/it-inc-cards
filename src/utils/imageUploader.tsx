import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { EditImg } from '@/assets/edit-img'
import { Button, Typography } from '@/components'

import s from './imageUploader.module.scss'

type ImageUploaderProps = {
  imageKey: string
  initialImageURL?: Blob | string | undefined
  label: string
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
}

export const ImageUploader: FC<ImageUploaderProps> = ({
  imageKey,
  initialImageURL,
  label,
  register,
  setValue,
}) => {
  const [imageURL, setImageURL] = useState<Blob | string | undefined>(initialImageURL)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]

        setImageURL(URL.createObjectURL(file))
        setValue(imageKey, file)
      }
    },
    [setValue, imageKey]
  )

  const selectFileHandler = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <>
      <div className={s.image} style={{ backgroundImage: `url(${imageURL})` }}>
        <input
          {...register(imageKey)}
          onChange={uploadHandler}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
      <Button fullWidth onClick={selectFileHandler} type={'button'} variant={'secondary'}>
        <EditImg />
        <Typography variant={'body2'}>{label}</Typography>
      </Button>
    </>
  )
}
