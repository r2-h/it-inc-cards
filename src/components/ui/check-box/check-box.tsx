import { FC } from 'react'

import CheckboxDoneImg from '@/assets/checkboxDone'
import CheckboxImg from '@/assets/checkboxImg'
import { Typography } from '@/components/ui/typography'
import * as Checkbox from '@radix-ui/react-checkbox'

import s from './check-box.module.scss'

type CheckboxDemoProps = {
  disabled?: boolean
  label?: string
  onChange: (checked: boolean) => void
  required?: boolean
}

export const CheckboxDemo: FC<CheckboxDemoProps> = ({
  disabled = false,
  label = '',
  onChange,
  // required,
}) => {
  return (
    <div className={s.wrapper}>
      <Checkbox.Root
        className={s.root}
        // defaultChecked
        disabled={disabled}
        id={'c1'}
        onCheckedChange={onChange}
        // required={required}
      >
        <CheckboxImg className={s.icon} />
        <Checkbox.Indicator>
          <CheckboxDoneImg className={s.icon} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      {label && (
        <Typography
          as={'label'}
          className={disabled ? `${s.checkboxLabel} ${s.checkboxLabelDisabled}` : s.checkboxLabel}
          htmlFor={'c1'}
          variant={'body2'}
        >
          {label}
        </Typography>
      )}
    </div>
  )
}
