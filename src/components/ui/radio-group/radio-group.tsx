import { ComponentPropsWithoutRef, FC } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  id?: string
  onChange?: () => void
  options: OptionsType[]
  value?: number | string
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>
type OptionsType = {
  disable: boolean
  title: string
}

export const RadioGroup: FC<RadioGroupProps> = ({
  className,
  defaultValue,
  disabled,
  id,
  onChange,
  options,
}) => {
  const radioGroupCN = clsx(s.radioGroupRoot, className)
  const labelCN = clsx(s.label, disabled && s.disabled)

  return (
    <RadioGroupRadix.Root
      className={radioGroupCN}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onChange}
    >
      {options.map(option => (
        <div className={s.wrapper} key={id}>
          <RadioGroupRadix.Item
            className={s.radioGroupItem}
            disabled={option.disable}
            id={option.title}
            value={option.title}
          >
            <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
          </RadioGroupRadix.Item>
          <Typography as={'label'} className={labelCN} htmlFor={option.title} variant={'body2'}>
            {option.title}
          </Typography>
        </div>
      ))}
    </RadioGroupRadix.Root>
  )
}
