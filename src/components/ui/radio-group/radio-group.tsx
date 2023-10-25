import { FC } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

type RadioGroupProps = {
  defaultValue: string
  disabled?: boolean
  values: ValuesType[]
}
type ValuesType = {
  disable: boolean
  title: string
}

export const RadioGroup: FC<RadioGroupProps> = ({ defaultValue, disabled, values }) => {
  const labelCN = disabled ? `${s.label} ${s.disabled}` : s.label

  return (
    <form>
      <RadioGroupRadix.Root
        className={s.radioGroupRoot}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        {values.map(value => (
          <div className={s.wrapper} key={value.title}>
            <RadioGroupRadix.Item
              className={s.radioGroupItem}
              disabled={value.disable}
              id={value.title}
              value={value.title}
            >
              <RadioGroupRadix.Indicator className={s.radioGroupIndicator} />
            </RadioGroupRadix.Item>
            <Typography as={'label'} className={labelCN} htmlFor={value.title} variant={'body2'}>
              {value.title}
            </Typography>
          </div>
        ))}
      </RadioGroupRadix.Root>
    </form>
  )
}
