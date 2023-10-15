import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={10}
    ref={ref}
    width={10}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'm5.94 5 2.867-2.86a.67.67 0 0 0-.947-.947L5 4.06 2.14 1.193a.67.67 0 0 0-.947.947L4.06 5 1.193 7.86a.667.667 0 0 0 .217 1.093.667.667 0 0 0 .73-.146L5 5.94l2.86 2.867a.667.667 0 0 0 1.093-.217.667.667 0 0 0-.146-.73L5.94 5Z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const DeleteIcon = memo(ForwardRef)
