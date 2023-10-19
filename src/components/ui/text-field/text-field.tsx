import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, FC, useState } from 'react'

import { DeleteIcon } from '@/assets/deleteIcon'
import Eye from '@/assets/eye'
import EyeClosed from '@/assets/eye-closed'
import { SearchImg } from '@/assets/search'
import { Typography } from '@/components/ui/typography'

import s from './text-field.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  label?: string
  name?: string
  onBlur?: any
  onChange?: any
  ref?: any
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  className,
  errorMessage,
  label,
  onChange,
  placeholder,
  ref,
  type,
  value,
  ...rest
}) => {
  const [tempValue, setTempValue] = useState(value || '')
  const [showPassword, setShowPassword] = useState(false)
  const finalType = getFinalType(type, showPassword)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.currentTarget.value)
  }
  const onEyeClickHandler = () => {
    setShowPassword(prev => !prev)
  }

  const searchImgCN = `${rest.disabled ? s.searchImgDisabled : s.searchImg} ${
    errorMessage ? s.errorIcon : ''
  }`

  return (
    <div className={s.wrapper}>
      {label && (
        <Typography as={'label'} className={s.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.input} style={{ borderColor: errorMessage ? 'red' : '' }}>
        {type === 'search' && <SearchImg className={searchImgCN} />}
        <input
          className={`${s.textField} ${className} ${errorMessage ? s.error : ''}`}
          onChange={onChangeHandler}
          placeholder={placeholder}
          ref={ref}
          type={finalType}
          value={tempValue}
        />
        {type === 'search' && (
          <button className={s.showPassword} onClick={() => setTempValue('')} type={'button'}>
            <DeleteIcon />
          </button>
        )}
        {type === 'password' && (
          <button className={s.showPassword} onClick={onEyeClickHandler} type={'button'}>
            {showPassword ? (
              <EyeClosed className={rest.disabled ? s.eye : ''} />
            ) : (
              <Eye className={rest.disabled ? s.eye : ''} />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <Typography className={s.error} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) => {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
