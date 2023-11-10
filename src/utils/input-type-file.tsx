import { ChangeEvent, FC, ReactNode, useRef } from 'react'

import { Button } from '@/components/ui/button'

type InputTypeFileProps = {
  className?: string
  setImage?: any
  trigger: ReactNode
}
export const InputTypeFile: FC<InputTypeFileProps> = ({ className, setImage, trigger }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      const formData = new FormData()

      if (file.size < 4000000) {
        formData.append('avatar', file)

        setImage(formData)
      } else {
        alert('Файл слишком большого размера')
      }
    }
  }
  const errorHandler = () => {
    alert('Picture error')
  }

  return (
    <>
      <Button
        className={className}
        onClick={selectFileHandler}
        onError={errorHandler}
        type={'button'}
        variant={'secondary'}
      >
        {trigger}
      </Button>
      <input onChange={uploadHandler} ref={inputRef} style={{ display: 'none' }} type={'file'} />
    </>
  )
}
