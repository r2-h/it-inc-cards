import { FC, useState } from 'react'

import DownImg from '@/assets/down-img'
import UpImg from '@/assets/up-img'
import { Typography } from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

export type Options = {
  id: string
  value: string
}

type SelectDemoProps = {
  className?: string
  disabled?: boolean
  label: string
  options: Options[]
  placeholder: string
}

export const SelectDemo: FC<SelectDemoProps> = ({
  disabled = false,
  label,
  options,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleValueChange = (value: string | undefined) => {
    setSelectedValue(value)
  }
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <div className={s.root}>
      <Typography as={'label'} className={s.selectLabel} variant={'body2'}>
        {label}
      </Typography>
      <Select.Root
        defaultValue={selectedValue}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
      >
        <Select.Trigger className={s.trigger}>
          <Select.Value placeholder={placeholder} />
          <Typography className={s.text} variant={'body1'}>
            {selectedValue}
          </Typography>
          <Select.Icon className={s.iconWrapper}>
            {isOpen ? <UpImg className={s.icon} /> : <DownImg className={s.icon} />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport className={s.viewport}>
              {options.map(option => (
                <Select.Item className={s.item} key={option.id} value={option.value}>
                  <Typography className={s.text} variant={'body1'}>
                    {option.value}
                  </Typography>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
