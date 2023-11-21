import { ComponentPropsWithoutRef, FC, useState } from 'react'

import DownImg from '@/assets/down-img'
import UpImg from '@/assets/up-img'
import { Typography } from '@/components/ui/typography'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

export type Options = {
  id: string
  value: string
}

type SelectDemoProps = {
  className?: string
  classNameViewport?: string
  defaultValue?: string
  disabled?: boolean
  fullWidth?: boolean
  label?: string
  onChangeValue: (value: string) => void
  options: Options[]
  placeholder?: string
  value?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select: FC<SelectDemoProps> = ({
  className,
  classNameViewport,
  defaultValue,
  disabled = false,
  fullWidth,
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
    root: clsx(s.root, fullWidth && s.fullWidth, className),
    viewport: clsx(s.viewport, classNameViewport),
  }

  return (
    <div className={cNames.root}>
      <Typography as={'label'} variant={'body2'}>
        {label}
      </Typography>
      <SelectRadix.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        value={value}
      >
        <SelectRadix.Trigger className={s.trigger}>
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className={s.iconWrapper}>
            {isOpen ? <UpImg className={s.icon} /> : <DownImg className={s.icon} />}
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content collisionPadding={0} position={'popper'}>
            <SelectRadix.Viewport className={cNames.viewport}>
              <SelectRadix.Group>
                {options.map(option => (
                  <SelectRadix.Item className={s.item} key={option.id} value={option.value}>
                    <SelectRadix.ItemText>
                      <Typography className={s.text} variant={'body1'}>
                        {option.value}
                      </Typography>
                    </SelectRadix.ItemText>
                  </SelectRadix.Item>
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
