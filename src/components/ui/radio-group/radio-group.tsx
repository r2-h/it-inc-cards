import { ComponentPropsWithoutRef, FC } from 'react'

import { Typography } from '@/components'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  className?: string
  onChange?: () => void
  options: RadioOptionsType[]
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>
export type RadioOptionsType = {
  title: string
  value: string
}

export const RadioGroup: FC<RadioGroupProps> = ({
  className,
  defaultValue,
  disabled,
  id,
  onChange,
  options,
  value,
}) => {
  const radioGroupCN = clsx(s.radioGroupRoot, className)
  const labelCN = clsx(s.label, disabled && s.disabled)

  return (
    <RadioGroupRadix.Root
      className={radioGroupCN}
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      onValueChange={onChange}
      value={value}
    >
      {options.map(option => (
        <div className={s.wrapper} key={option.value}>
          <RadioGroupRadix.Item className={s.radioGroupItem} id={option.value} value={option.value}>
            <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
          </RadioGroupRadix.Item>
          <Typography as={'label'} className={labelCN} htmlFor={option.value} variant={'body2'}>
            {option.title}
          </Typography>
        </div>
      ))}
    </RadioGroupRadix.Root>
  )
}
