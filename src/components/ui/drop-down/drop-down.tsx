import { FC, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './drop-down.module.scss'

type DropDownProps = {
  avatar?: ReactNode
  children?: ReactNode
  email?: string
  name?: string
  trigger?: ReactNode
}

export const DropDown: FC<DropDownProps> = ({ avatar, children, email, name, trigger }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.trigger}>
        {trigger ?? <button className={s.buttonTrigger}></button>}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.content} sideOffset={5}>
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
  text: string
}

export const DropDownItem: FC<DropDownItemProps> = ({ icon, lastItem, text }) => {
  return (
    <>
      <DropdownMenu.Item className={s.item}>
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
  avatar?: ReactNode
  email?: string
  name?: string
}

export const DropDownLabel: FC<DropDownLabelProps> = ({ avatar, email, name }) => {
  return (
    <div className={s.labelWrapper}>
      {avatar}
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
