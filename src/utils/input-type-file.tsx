import { ChangeEvent, FC, ReactNode, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/services'
import { convertFileToBase64 } from '@/utils/convert-file-to-base64'

import s from '@/components/auth/edit-profile/edit-profile.module.scss'

type InputTypeFileProps = {
  buttonImg: ReactNode
  setImage: any
}
export const InputTypeFile: FC<InputTypeFileProps> = ({ buttonImg, setImage }) => {
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          console.log('file64: ', file64)
          dispatch(setImage(file64))
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <div>
      <Button
        className={s.buttonAvatar}
        onClick={selectFileHandler}
        type={'button'}
        variant={'secondary'}
      >
        {buttonImg}
      </Button>
      <input onChange={uploadHandler} ref={inputRef} style={{ display: 'none' }} type={'file'} />
    </div>
  )
}
