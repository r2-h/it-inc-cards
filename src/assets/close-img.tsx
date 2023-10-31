import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#clip0_29001_4131)'}>
      <path
        d={
          'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'
        }
        fill={'#fff'}
      />
    </g>
    <defs>
      <clipPath id={'clip0_29001_4131'}>
        <path d={'M0 0H24V24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)

export default memo(SvgComponent)
