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
import { useMeQuery } from '@/services/auth/auth-api'

import s from './layout.module.scss'

export const Layout = () => {
  const auth = useMeQuery()

  const [isModalOpen, setIsModalOpen] = useState(false)
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
            <DropDownItem
              icon={<SignOutImg />}
              lastItem
              onSelect={() => alert('SIGN OUT')}
              text={'Sign Out'}
            />
          </>
        }
        email={auth.data?.email}
        isLoggedIn
        name={name}
      />
      {isModalOpen && (
        <Modal onOpenChange={() => setIsModalOpen(false)} open={isModalOpen}>
          <EditProfile
            avatar={<AvatarLarge />}
            email={auth.data?.email}
            name={name}
            onSubmit={(data: FormValues) => {
              setIsModalOpen(false)
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
