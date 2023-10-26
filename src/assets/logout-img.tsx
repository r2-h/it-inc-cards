import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    ref={ref}
    viewBox={'0 0 16 16'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M4.667 4a.667.667 0 000-1.333H3.333a.667.667 0 00-.666.666v9.334a.667.667 0 00.666.666h1.334a.666.666 0 100-1.333H4V4h.667zM13.88 7.613L12 4.947a.667.667 0 10-1.087.773l1.147 1.613H6.667a.667.667 0 000 1.334H12l-1.2 1.6a.67.67 0 00.133.933.666.666 0 00.934-.133l2-2.667a.667.667 0 00.013-.787z'
      }
      fill={'#fff'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
