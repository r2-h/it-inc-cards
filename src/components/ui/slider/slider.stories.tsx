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
    setState(prev => (prev.toString() !== args.value.toString() ? args.value : prev))

    if (args.min && args.value[0] < args.min) {
      setState(prev => [args.min!, prev[1]])
    }
    if (args.max && args.value[1] > args.max) {
      setState(prev => [prev[0], args.max!])
    }
  }, [args])

  return (
    <Slider
      max={args.max}
      min={args.min}
      minStepsBetweenThumbs={args.minStepsBetweenThumbs}
      onValueChange={(value: number[]) => setState(value)}
      value={state}
    />
  )
}
