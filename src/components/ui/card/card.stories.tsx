import type { Meta, StoryObj } from '@storybook/react'
import {Card} from "@/components/ui/card/card.tsx";


const meta = {
    component: Card,
    tags: ['autodocs'],
    title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
    args: {},
}
