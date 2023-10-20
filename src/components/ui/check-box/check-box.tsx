import { FC } from 'react'

import CheckboxDoneImg from '@/assets/checkboxDone'
import CheckboxImg from '@/assets/checkboxImg'
import { Typography } from '@/components/ui/typography'
import * as Checkbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './check-box.module.scss'

type CheckboxDemoProps = {
  checked?: boolean
  disabled?: boolean
  id: string
  label?: string
  onChange?: (checked: boolean) => void
  required?: boolean
}

export const CheckboxDemo: FC<CheckboxDemoProps> = ({
  checked,
  disabled = false,
  id,
  label = '',
  onChange,
  required,
}) => {
  const labelCN = clsx(s.checkboxLabel, disabled && s.checkboxLabelDisabled)

  return (
    <div className={s.wrapper}>
      <Checkbox.Root
        checked={checked}
        className={s.root}
        // defaultChecked
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
        required={required}
      >
        <CheckboxImg className={s.icon} />
        <Checkbox.Indicator>
          <CheckboxDoneImg className={s.icon} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      {label && (
        <Typography as={'label'} className={labelCN} htmlFor={id} variant={'body2'}>
          {label}
        </Typography>
      )}
    </div>
  )
}
