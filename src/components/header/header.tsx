import { FC } from 'react'

import { ItIncubatorImg } from '@/assets/it-incubator'
import { MyProfileImg } from '@/assets/my-profile-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { SignIn } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { DropDown, DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

type HeaderProps = {
  avatar?: any
  email?: string
  isLoggedIn: boolean
  name?: string
}

export const Header: FC<HeaderProps> = ({ avatar, email, isLoggedIn, name }) => {
  return (
    <div className={s.wrapper}>
      <ItIncubatorImg />
      {isLoggedIn ? (
        <div className={s.avatarBlock}>
          <Typography className={s.name} variant={'subtitle1'}>
            {name}
          </Typography>
          <DropDown avatar={avatar} email={email} name={name} trigger={<button>{avatar}</button>}>
            <DropDownItem icon={<MyProfileImg />} text={'My profile'}></DropDownItem>
            <DropDownItem icon={<SignOutImg />} lastItem text={'Sign Out'}></DropDownItem>
          </DropDown>
        </div>
      ) : (
        <Modal trigger={<Button>Sign in</Button>}>
          <SignIn />
        </Modal>
      )}
    </div>
  )
}
