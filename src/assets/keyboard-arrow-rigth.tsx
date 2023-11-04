import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#a)'}>
      <path d={'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41Z'} fill={'currentColor'} />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const ArrowRigth = memo(ForwardRef)

export default ArrowRigth
