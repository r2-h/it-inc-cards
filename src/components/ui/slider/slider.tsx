import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderPropsType = {
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (value: number[]) => void
  value: number[]
}
export const Slider = ({
  max,
  min,
  minStepsBetweenThumbs = 1,
  onValueChange,
  value,
}: SliderPropsType) => {
  console.log(min, max)

  return (
    <div className={s.container}>
      <div className={s.min}>{value[0] | 0}</div>
      <RadixSlider.Root
        className={s.SliderRoot}
        max={max}
        min={min}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={onValueChange}
        step={1}
        value={value}
      >
        <RadixSlider.Track className={s.SliderTrack}>
          <RadixSlider.Range className={s.SliderRange} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={s.SliderThumb} />
        <RadixSlider.Thumb className={s.SliderThumb} />
      </RadixSlider.Root>
      <div className={s.max}>{value[1] | 0}</div>
    </div>
  )
}
