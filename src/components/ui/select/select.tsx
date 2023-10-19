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
  defaultValue?: string
  disabled?: boolean
  label: string
  options: Options[]
  placeholder: string
}

export const SelectDemo: FC<SelectDemoProps> = ({
  defaultValue,
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
        defaultValue={defaultValue}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        value={selectedValue}
      >
        <Select.Trigger className={s.trigger}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={s.iconWrapper}>
            {isOpen ? <UpImg className={s.icon} /> : <DownImg className={s.icon} />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position={'popper'}>
            <Select.Viewport className={s.viewport}>
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
