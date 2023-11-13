import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { MyProfileImg } from '@/assets/my-profile-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { EditProfile } from '@/components/auth/edit-profile'
import { EditProfileFormValues } from '@/components/auth/edit-profile/edit-mode-on'
import { Header } from '@/components/header'
import { DropDownItem } from '@/components/ui/drop-down'
import { Modal } from '@/components/ui/modal'
import { useLogoutMutation, useMeQuery, useUpdateUserMutation } from '@/services/auth/auth-api'

import s from './layout.module.scss'

export const Layout = () => {
  const { data: auth, isError } = useMeQuery()
  const [edit] = useUpdateUserMutation()
  const [logOut] = useLogoutMutation()
  const navigate = useNavigate()

  const isAuthenticated = !isError

  const [isModalOpen, setIsModalOpen] = useState(false)
  const editProfileHandler = (args: EditProfileFormValues) => {
    edit(args)
    setIsModalOpen(false)
  }

  const logOutHandler = () => {
    logOut()
    navigate('/login')
  }

  return (
    <>
      <Header
        avatar={auth?.avatar}
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
              onSelect={logOutHandler}
              text={'Sign Out'}
            />
          </>
        }
        email={auth?.email}
        isLoggedIn={isAuthenticated}
        name={auth?.name}
      />
      {isModalOpen && (
        <Modal onOpenChange={() => setIsModalOpen(false)} open={isModalOpen}>
          <EditProfile
            avatar={auth?.avatar}
            email={auth?.email}
            name={auth?.name}
            onSubmit={editProfileHandler}
          />
        </Modal>
      )}
      <div className={s.content}>
        <Outlet />
      </div>
    </>
  )
}
