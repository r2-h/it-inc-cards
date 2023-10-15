import type { Meta, StoryObj } from '@storybook/react'

import { SignOutImg } from '@/assets/sign-out-img'
import { Typography } from '@/components/ui/typography'

import s from './button.module.scss'

import { Button } from './'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <Typography className={s.title} variant={'subtitle2'}>
        Button primarydsfsfsdfsdfsdfsdfssfsdfsdfsd
      </Typography>
    ),
    disabled: false,
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    children: (
      <>
        <SignOutImg className={s.icon} />
        <Typography className={s.title} variant={'subtitle2'}>
          Button primary
        </Typography>
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: (
      <Typography className={s.title} variant={'subtitle2'}>
        Secondary Button
      </Typography>
    ),
    disabled: false,
    variant: 'secondary',
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <SignOutImg className={s.icon} />
        <Typography className={s.title} variant={'subtitle2'}>
          Secondary Button
        </Typography>
      </>
    ),
    disabled: false,
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    children: (
      <Typography className={s.title} variant={'subtitle2'}>
        Tertiary
      </Typography>
    ),
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    children: (
      <Typography className={s.linkTitle} variant={'subtitle1'}>
        Link-button
      </Typography>
    ),

    disabled: false,

    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: (
      <Typography className={s.title} variant={'subtitle2'}>
        Full Width Button
      </Typography>
    ),
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: (
      <Typography className={s.title} variant={'subtitle2'}>
        Link that looks like a button
      </Typography>
    ),
    href: '#',
    variant: 'primary',
  },
}
