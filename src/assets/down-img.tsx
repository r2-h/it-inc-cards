import { Ref, SVGProps, forwardRef, memo } from 'react'

function SvgComponent(props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) {
  return (
    <svg
      fill={'none'}
      height={16}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={16}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M5.514 9.458a1 1 0 011.64-.77l5.36 4.48 5.37-4.32a1 1 0 011.41.15 1 1 0 01-.15 1.46l-6 4.83a1 1 0 01-1.27 0l-6-5a1 1 0 01-.36-.83z'
        }
        fill={'#fff'}
      />
    </svg>
  )
}

const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
