import * as RadixSlider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

export type SliderProps = {
  className?: string
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (value: number[]) => void
  step?: number
  value: number[]
}
export const Slider = ({
  className,
  max,
  min,
  minStepsBetweenThumbs = 1,
  onValueChange,
  step = 1,
  value,
}: SliderProps) => {
  const containerCN = clsx(s.container, className)

  return (
    <div className={containerCN}>
      <div className={s.number}>{value[0]}</div>
      <RadixSlider.Root
        className={s.sliderRoot}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={onValueChange}
        step={step}
        value={value}
      >
        <RadixSlider.Track className={s.sliderTrack}>
          <RadixSlider.Range className={s.sliderRange} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={s.sliderThumb} />
        <RadixSlider.Thumb className={s.sliderThumb} />
      </RadixSlider.Root>
      <div className={s.number}>{value[1]}</div>
    </div>
  )
}
