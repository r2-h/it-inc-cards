import type {Meta, StoryObj} from '@storybook/react'

import {CheckboxDemo} from '@/components/ui/check-box/check-box'

const meta = {
    component: CheckboxDemo,
    tags: ['autodocs'],
    title: 'Components/CheckboxDemo',
} satisfies Meta<typeof CheckboxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxWithLabel: Story = {
    args: {
        label: 'Check-box',
        disabled: false,
    },
}

export const Checkbox: Story = {
    args: {
        disabled: false,
    },
}
