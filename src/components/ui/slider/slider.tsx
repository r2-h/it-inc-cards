import { ComponentPropsWithoutRef, FC } from 'react'

import { Typography } from '@/components'
import * as RadixSlider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

export type SliderProps = {
  className?: string
  label?: string
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (value: [number, number]) => void
  step?: number
  value: [number, number]
} & ComponentPropsWithoutRef<typeof RadixSlider.Root>
export const Slider: FC<SliderProps> = ({
  className,
  label,
  max,
  min,
  minStepsBetweenThumbs = 1,
  onValueChange,
  step = 1,
  value,
}) => {
  const wrapperCN = clsx(s.wrapper, className)

  return (
    <div className={s.container}>
      {label && <Typography variant={'body2'}>{label}</Typography>}
      <div className={wrapperCN}>
        <div className={s.number}>{value[0]}</div>
        <RadixSlider.Root
          className={s.sliderRoot}
          max={max}
          min={min}
          minStepsBetweenThumbs={minStepsBetweenThumbs}
          onValueChange={onValueChange}
          step={step}
          value={value}
          // onValueCommit={}
        >
          <RadixSlider.Track className={s.sliderTrack}>
            <RadixSlider.Range className={s.sliderRange} />
          </RadixSlider.Track>
          <RadixSlider.Thumb className={s.sliderThumb} />
          <RadixSlider.Thumb className={s.sliderThumb} />
        </RadixSlider.Root>
        <div className={s.number}>{value[1]}</div>
      </div>
    </div>
  )
}
