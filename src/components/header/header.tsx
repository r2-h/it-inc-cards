import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import ava from '@/assets/ava.jpg'
import { ItIncubatorImg } from '@/assets/it-incubator'
import { Button, DropDown, Typography } from '@/components'

import s from './header.module.scss'

type HeaderProps = {
  avatar?: File | undefined
  dropDownChildren?: ReactNode
  email?: string
  isLoggedIn: boolean
  name?: string
}

export const Header: FC<HeaderProps> = ({ avatar, dropDownChildren, email, isLoggedIn, name }) => {
  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <Link to={'/'}>
          <ItIncubatorImg className={s.incImg} />
        </Link>

        {isLoggedIn ? (
          <DropDown
            avatar={avatar}
            email={email}
            name={name}
            trigger={
              <div className={s.avatarBlock}>
                <Typography className={s.name} variant={'subtitle1'}>
                  {name}
                </Typography>
                <div className={s.img} style={{ backgroundImage: `url(${avatar ?? ava})` }} />
              </div>
            }
          >
            {dropDownChildren}
          </DropDown>
        ) : (
          <Button as={'a'} href={'/login'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
