import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import ava from '@/assets/ava.jpg'
import { Typography } from '@/components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './drop-down.module.scss'

type DropDownProps = {
  align?: 'center' | 'end' | 'start' | undefined
  avatar?: File | undefined
  children?: ReactNode
  className?: string
  email?: string
  name?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const DropDown: FC<DropDownProps> = ({
  align = 'center',
  avatar,
  children,
  className,
  email,
  name,
  trigger,
}) => {
  const contentCN = clsx(s.content, className)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.trigger}>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={align} className={contentCN} sideOffset={5}>
          {name && (
            <>
              <DropDownLabel avatar={avatar} email={email} name={name} />
              <DropdownMenu.Separator className={s.separator} />
            </>
          )}
          {children}
          <DropdownMenu.Arrow asChild className={s.arrowBox}>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type DropDownItemProps = {
  disabled?: boolean
  icon?: ReactNode
  lastItem?: boolean
  onSelect?: () => void
  text: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropDownItem: FC<DropDownItemProps> = ({
  disabled = false,
  icon,
  lastItem,
  onSelect,
  text,
}) => {
  return (
    <>
      <DropdownMenu.Item className={s.item} disabled={disabled} onSelect={onSelect}>
        <div className={s.icon}>{icon}</div>
        <Typography variant={'caption'}>{text}</Typography>
      </DropdownMenu.Item>
      {!lastItem && <DropdownMenu.Separator className={s.separator} />}
    </>
  )
}

type DropDownLabelProps = {
  avatar?: File | undefined
  email?: string
  name?: string
}

export const DropDownLabel: FC<DropDownLabelProps> = ({ avatar, email, name }) => {
  return (
    <div className={s.labelWrapper}>
      <div className={s.img} style={{ backgroundImage: `url(${avatar ?? ava})` }} />
      <DropdownMenu.Label className={s.label}>
        <Typography as={'label'} variant={'subtitle2'}>
          {name}
        </Typography>
        <Typography as={'label'} variant={'caption'}>
          {email}
        </Typography>
      </DropdownMenu.Label>
    </div>
  )
}
