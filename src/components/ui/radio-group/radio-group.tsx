import { FC } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroup from '@radix-ui/react-radio-group'

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

export const RadioGroupDemo: FC<RadioGroupProps> = ({ defaultValue, disabled, values }) => {
  const labelCN = disabled ? `${s.label} ${s.disabled}` : s.label

  return (
    <form>
      <RadioGroup.Root className={s.radioGroupRoot} defaultValue={defaultValue} disabled={disabled}>
        {values.map(value => (
          <div className={s.wrapper} key={value.title}>
            <RadioGroup.Item
              className={s.radioGroupItem}
              disabled={value.disable}
              id={value.title}
              value={value.title}
            >
              <RadioGroup.Indicator className={s.radioGroupIndicator} />
            </RadioGroup.Item>
            <Typography as={'label'} className={labelCN} htmlFor={value.title} variant={'body2'}>
              {value.title}
            </Typography>
          </div>
        ))}
      </RadioGroup.Root>
    </form>
  )
}
