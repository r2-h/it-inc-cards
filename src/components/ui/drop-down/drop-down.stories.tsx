import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '@/assets/avatar'
import { EditImg } from '@/assets/edit-img'
import { MyProfileImg } from '@/assets/my-profile-img'
import { PlayCircleImg } from '@/assets/play-circle-img'
import { SignOutImg } from '@/assets/sign-out-img'
import { TrashImg } from '@/assets/trash-img'
import { TriggerMore } from '@/components'

import { DropDown, DropDownItem } from './drop-down'

const meta = {
  component: DropDown,
  tags: ['autodocs'],
  title: 'Components/DropDown',
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownProfile: Story = {
  args: {
    children: (
      <>
        <DropDownItem icon={<MyProfileImg />} text={'My profile'}></DropDownItem>
        <DropDownItem icon={<SignOutImg />} lastItem text={'Sign Out'}></DropDownItem>
      </>
    ),
    email: 'j&johnson@gmail.com',
    name: 'Ivan',
    trigger: <Avatar />,
  },
}

export const DropDownMore: Story = {
  args: {
    children: (
      <>
        <DropDownItem icon={<PlayCircleImg />} text={'Learn'}></DropDownItem>
        <DropDownItem icon={<EditImg />} text={'Edit'}></DropDownItem>
        <DropDownItem icon={<TrashImg />} lastItem text={'Delete'}></DropDownItem>
      </>
    ),
    trigger: <TriggerMore />,
  },
}
