import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, FC, useState } from 'react'

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
  label?: string
  name?: string
  onChange?: any
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  className,
  disabled,
  errorMessage,
  label,
  placeholder,
  type,
  value,
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

  const searchImgCN = clsx(s.searchImg, { [s.errorIcon]: errorMessage }, { [s.disabled]: disabled })
  const deleteCN = clsx(s.delete, { [s.disabled]: disabled })
  const inputCN = clsx(
    s.textField,
    className,
    { [s.error]: errorMessage },
    { [s.disabled]: disabled }
  )

  return (
    <div className={s.wrapper}>
      {label && (
        <Typography as={'label'} className={s.label} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.inputWrapper} style={{ borderColor: errorMessage ? 'red' : '' }}>
        {type === 'search' && <SearchImg className={searchImgCN} />}
        <input
          className={inputCN}
          disabled={disabled}
          onChange={onChangeHandler}
          placeholder={placeholder}
          type={finalType}
          value={tempValue}
        />
        {type === 'search' && (
          <button className={deleteCN} onClick={() => setTempValue('')} type={'button'}>
            <DeleteIcon />
          </button>
        )}
        {type === 'password' && (
          <button className={s.showPassword} onClick={onEyeClickHandler} type={'button'}>
            {showPassword ? (
              <EyeClosed className={disabled ? s.disabled : ''} />
            ) : (
              <Eye className={disabled ? s.disabled : ''} />
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
