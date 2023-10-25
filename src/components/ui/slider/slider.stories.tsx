import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '@/components/ui/slider/slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderStory: Story = {
  args: {
    onValueChange: () => {},
    value: [0, 100],
  },
  render: () => <StorySlider />,
}

const StorySlider = () => {
  const [value, setValue] = useState([0, 100])

  return <Slider onValueChange={value => setValue(value)} value={value} />
}
