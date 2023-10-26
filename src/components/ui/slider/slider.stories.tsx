import type { Meta, StoryObj } from '@storybook/react'

import { useEffect, useState } from 'react'

import { Slider, SliderPropsType } from '@/components/ui/slider/slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderStory: Story = {
  args: {
    value: [0, 100],
  },
  render: args => <StorySlider {...args} />,
}

const StorySlider = (args: SliderPropsType) => {
  const [state, setState] = useState(args.value)

  useEffect(() => {
    setState(args.value)
  }, [args])

  return (
    <Slider
      max={args.max}
      min={args.min}
      onValueChange={(value: number[]) => setState(value)}
      value={state}
    />
  )
}
