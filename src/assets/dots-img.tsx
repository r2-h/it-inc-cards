import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={12}
    viewBox={'0 0 12 12'}
    width={12}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M6 7a1 1 0 100-2 1 1 0 000 2zM6 3.5a1 1 0 100-2 1 1 0 000 2zM6 10.5a1 1 0 100-2 1 1 0 000 2z'
      }
      fill={'#fff'}
    />
  </svg>
)

export default memo(SvgComponent)
