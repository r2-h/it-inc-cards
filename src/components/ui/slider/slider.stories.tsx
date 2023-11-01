import type { Meta, StoryObj } from '@storybook/react'

import { useEffect, useState } from 'react'

import { Slider, SliderProps } from '@/components/ui/slider/slider'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: [25, 75],
  },
  render: args => <StorySlider {...args} />,
}

const StorySlider = (args: SliderProps) => {
  const [state, setState] = useState<[number, number]>(args.value)

  useEffect(() => {
    setState(prev => (prev.toString() !== args.value.toString() ? args.value : prev))

    // if (args.min && args.value[0] < args.min) {
    //   setState(prev => [args.min!, prev[1]])
    // }
    // if (args.max && args.value[1] > args.max) {
    //   setState(prev => [prev[0], args.max!])
    // }
  }, [args])

  return (
    <Slider {...args} onValueChange={(value: [number, number]) => setState(value)} value={state} />
  )
}
