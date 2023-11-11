import type { Meta, StoryObj } from '@storybook/react'

import { BrowserRouter } from 'react-router-dom'

import { MyProfileImg } from '@/assets/my-profile-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { Header } from '@/components/header/header'
import { DropDownItem } from '@/components/ui/drop-down'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    isLoggedIn: false,
  },
  render: args => (
    <BrowserRouter>
      <Header {...args} />
    </BrowserRouter>
  ),
}

export const HeaderWithAvatar: Story = {
  args: {
    avatar: undefined,

    dropDownChildren: (
      <>
        <DropDownItem icon={<MyProfileImg />} text={'My profile'}></DropDownItem>
        <DropDownItem icon={<SignOutImg />} lastItem text={'Sign Out'}></DropDownItem>
      </>
    ),
    email: 'e@mail.com',
    isLoggedIn: true,
    name: 'Ivan',
  },
  render: args => (
    <BrowserRouter>
      <Header {...args} />
    </BrowserRouter>
  ),
}
