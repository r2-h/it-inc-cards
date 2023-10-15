import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    ref={ref}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M14 4.001h-3.333V2.888A1.614 1.614 0 0 0 9 1.334H7a1.613 1.613 0 0 0-1.667 1.554V4H2a.667.667 0 0 0 0 1.333h.667v7.334a2 2 0 0 0 2 2h6.666a2 2 0 0 0 2-2V5.334H14a.667.667 0 1 0 0-1.333ZM6.667 2.888c0-.107.14-.22.333-.22h2c.193 0 .333.113.333.22V4H6.667V2.888ZM12 12.668a.667.667 0 0 1-.667.666H4.667A.667.667 0 0 1 4 12.668V5.334h8v7.334Z'
        }
        fill={'#fff'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 .001h16v16H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const TrashImg = memo(ForwardRef)
