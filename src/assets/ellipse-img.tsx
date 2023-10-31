import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={18}
    viewBox={'0 0 18 18'}
    width={18}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={9} cy={9} r={8.5} stroke={'#fff'} />
  </svg>
)

export default memo(SvgComponent)
