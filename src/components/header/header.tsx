import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import ava from '@/assets/ava.jpg'
import { ItIncubatorImg } from '@/assets/it-incubator'
import { Button } from '@/components/ui/button'
import { DropDown } from '@/components/ui/drop-down'
import { Typography } from '@/components/ui/typography'

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
    <div className={s.root}>
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
                <button>
                  <div className={s.img} style={{ backgroundImage: `url(${avatar ?? ava})` }} />
                </button>
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
    </div>
  )
}
