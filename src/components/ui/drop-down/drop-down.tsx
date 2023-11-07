import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './drop-down.module.scss'

type DropDownProps = {
  align?: 'center' | 'end' | 'start' | undefined
  avatar?: string | undefined
  children?: ReactNode
  className?: string
  email?: string
  name?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const DropDown: FC<DropDownProps> = ({
  align = 'end',
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
      <DropdownMenu.Trigger className={s.trigger}>
        {trigger ?? <button className={s.buttonTrigger}></button>}
        {/*если trigger кнопка, в кнопку
        нужен forwardRef*/}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          className={contentCN}
          // onClick={e => e.stopPropagation()}
          sideOffset={5}
        >
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
  icon?: ReactNode
  lastItem?: boolean
  onSelect?: () => void
  text: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropDownItem: FC<DropDownItemProps> = ({ icon, lastItem, onSelect, text }) => {
  return (
    <>
      <DropdownMenu.Item className={s.item} onSelect={onSelect}>
        <div className={s.icon}>{icon}</div>
        <Typography className={s.text} variant={'caption'}>
          {text}
        </Typography>
      </DropdownMenu.Item>
      {!lastItem && <DropdownMenu.Separator className={s.separator} />}
    </>
  )
}

type DropDownLabelProps = {
  avatar?: string | undefined
  email?: string
  name?: string
}

export const DropDownLabel: FC<DropDownLabelProps> = ({ avatar, email, name }) => {
  return (
    <div className={s.labelWrapper}>
      <div className={s.img} style={{ backgroundImage: `url(${avatar})` }} />
      <DropdownMenu.Label className={s.label}>
        <Typography as={'label'} className={s.name} variant={'subtitle2'}>
          {name}
        </Typography>
        <Typography as={'label'} className={s.email} variant={'caption'}>
          {email}
        </Typography>
      </DropdownMenu.Label>
    </div>
  )
}
