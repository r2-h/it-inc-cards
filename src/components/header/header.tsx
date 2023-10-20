import { FC } from 'react'

import { Avatar } from '@/assets/avatar'
import { ItIncubatorImg } from '@/assets/it-incubator'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

type HeaderProps = {
  isLoggedIn: boolean
  name?: string
}

export const Header: FC<HeaderProps> = ({ isLoggedIn, name }) => {
  return (
    <div className={s.wrapper}>
      <ItIncubatorImg />
      {isLoggedIn ? (
        <div className={s.avatarBlock}>
          <Typography className={s.name} variant={'subtitle1'}>
            {name}
          </Typography>
          <button>
            <Avatar />
          </button>
        </div>
      ) : (
        <Button>Sign In</Button>
      )}
    </div>
  )
}
