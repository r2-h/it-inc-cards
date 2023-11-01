import { ComponentProps, ComponentPropsWithoutRef, FC, useState } from 'react'

import { DeleteIcon } from '@/assets/deleteIcon'
import Eye from '@/assets/eye'
import EyeClosed from '@/assets/eye-closed'
import { SearchImg } from '@/assets/search'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  disabled?: boolean
  errorMessage?: string
  fullWidth?: boolean
  label?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearClick?: () => void
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  className,
  disabled,
  errorMessage,
  fullWidth,
  label,
  onChange,
  onClearClick,
  placeholder,
  type,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const finalType = getFinalType(type, showPassword)

  const onEyeClickHandler = () => {
    setShowPassword(prev => !prev)
  }

  const searchImgCN = clsx(s.searchImg, disabled && s.disabled)
  const deleteIconCN = clsx(s.deleteBtn, disabled && s.disabled)
  const eyeIconCN = clsx(disabled && s.disabled)
  const inputCN = clsx(s.textField, errorMessage && s.error, disabled && s.disabled)
  const inputWrapperCN = clsx(
    s.inputWrapper,
    errorMessage && s.error,
    fullWidth && s.fullWidth,
    className
  )
  const labelCN = clsx(s.label, disabled && s.disabled)

  return (
    <div className={s.container}>
      {label && (
        <Typography as={'label'} className={labelCN} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={inputWrapperCN}>
        {type === 'search' && <SearchImg className={searchImgCN} />}
        <input
          className={inputCN}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          type={finalType}
          value={value}
        />
        {type === 'search' && (
          <button className={deleteIconCN} onClick={onClearClick} type={'button'}>
            <DeleteIcon />
          </button>
        )}
        {type === 'password' && (
          <button className={s.eyeBtn} onClick={onEyeClickHandler} type={'button'}>
            {showPassword ? <EyeClosed className={eyeIconCN} /> : <Eye className={eyeIconCN} />}
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
