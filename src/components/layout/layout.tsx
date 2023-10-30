import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Avatar } from '@/assets/avatar'
import { AvatarLarge } from '@/assets/avatar-large'
import { MyProfileImg } from '@/assets/my-profile-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { EditProfile } from '@/components/auth/edit-profile'
import { FormValues } from '@/components/auth/edit-profile/edit-mode-on'
import { Header } from '@/components/header'
import { DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'

import s from './layout.module.scss'

export const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const email = 'e@mail.com'
  const [name, setName] = useState('Ivan')

  return (
    <>
      <Header
        avatar={<Avatar />}
        dropDownChildren={
          <>
            <DropDownItem
              icon={<MyProfileImg />}
              onSelect={() => setIsModalOpen(true)}
              text={'My profile'}
            />
            <DropDownItem icon={<SignOutImg />} lastItem text={'Sign Out'} />
          </>
        }
        email={email}
        isLoggedIn
        name={name}
      />
      {isModalOpen && (
        <Modal onOpenChange={() => setIsModalOpen(false)} open={isModalOpen} trigger={<></>}>
          <EditProfile
            avatar={<AvatarLarge />}
            email={email}
            name={name}
            onSubmit={(data: FormValues) => {
              console.log(data)
              setName(data.name)
            }}
          />
        </Modal>
      )}
      <div className={s.content}>
        <Outlet />
      </div>
    </>
  )
}
