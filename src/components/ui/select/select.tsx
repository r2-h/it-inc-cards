import { FC, useState } from 'react'

import DownImg from '@/assets/down-img'
import UpImg from '@/assets/up-img'
import { Typography } from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type Options = {
  id: string
  value: string
}

type SelectDemoProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  label?: string
  onChangeValue: (value: string) => void
  options: Options[]
  placeholder?: string
  value: string
}

export const SelectDemo: FC<SelectDemoProps> = ({
  className,
  defaultValue,
  disabled = false,
  label,
  onChangeValue,
  options,
  placeholder,
  value,
}) => {
  //const [selectedValue, setSelectedValue] = useState<string | undefined>(value)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleValueChange = (value: string) => {
    onChangeValue(value)
  }
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const cNames = {
    root: clsx(s.root, className),
    viewport: clsx(s.viewport, className),
  }

  return (
    <div className={cNames.root}>
      <Typography as={'label'} className={s.selectLabel} variant={'body2'}>
        {label}
      </Typography>
      <Select.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        value={value}
      >
        <Select.Trigger className={s.trigger}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={s.iconWrapper}>
            {isOpen ? <UpImg className={s.icon} /> : <DownImg className={s.icon} />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position={'popper'}>
            <Select.Viewport className={cNames.viewport}>
              <Select.Group>
                {options.map(option => (
                  <Select.Item className={s.item} key={option.id} value={option.value}>
                    <Select.ItemText>
                      <Typography className={s.text} variant={'body1'}>
                        {option.value}
                      </Typography>
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
