import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Input',
    fullWidth: false,
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    label: 'Input',
    placeholder: 'Password',
    type: 'password',
    fullWidth: false,
  },
}

export const Error: Story = {
  args: {
    disabled: false,
    errorMessage: 'Error message',
    label: 'Input with error',
    value: 'Wrong value',
    fullWidth: false,
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    placeholder: 'Input search',
    type: 'search',
    fullWidth: false,
  },
}
