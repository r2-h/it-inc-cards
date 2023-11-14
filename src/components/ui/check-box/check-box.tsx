import { FC } from 'react'

import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './check-box.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id: string
  label: string
  onChange?: (checked: boolean) => void
  required?: boolean
}
export const Checkbox: FC<CheckboxProps> = ({
  checked,
  className,
  disabled = false,
  id,
  label = '',
  onChange,
  required,
}) => {
  const labelCN = clsx(s.checkboxLabel, disabled && s.checkboxLabelDisabled)
  const containerCN = clsx(s.container, className)

  return (
    <div className={containerCN}>
      <div className={s.wrapper}>
        <CheckboxRadix.Root
          checked={checked}
          className={s.checkboxRoot}
          // defaultChecked
          disabled={disabled}
          id={id}
          onCheckedChange={onChange}
          required={required}
        >
          <CheckboxRadix.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon} />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
      </div>
      <Typography as={'label'} className={labelCN} htmlFor={id} variant={'body2'}>
        {label}
      </Typography>
    </div>
  )
}
