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
    fullWidth: false,
    label: 'Input',
    placeholder: 'Input',
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    fullWidth: false,
    label: 'Input',
    placeholder: 'Password',
    type: 'password',
  },
}

export const Error: Story = {
  args: {
    disabled: false,
    errorMessage: 'Error message',
    fullWidth: false,
    label: 'Input with error',
    value: 'Wrong value',
  },
}
export const Search: Story = {
  args: {
    disabled: false,
    fullWidth: false,
    placeholder: 'Input search',
    type: 'search',
  },
}
