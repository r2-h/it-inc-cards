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
    <g clipPath={'url(#a)'} fill={'#fff'}>
      <path
        d={
          'M12.667 13.335H3.333a.667.667 0 1 0 0 1.333h9.334a.666.666 0 1 0 0-1.333ZM3.333 12.001h.06l2.78-.253c.305-.03.59-.165.807-.38l6-6a1.28 1.28 0 0 0-.047-1.807l-1.826-1.826a1.333 1.333 0 0 0-1.774-.047l-6 6c-.215.217-.35.502-.38.807l-.286 2.78a.667.667 0 0 0 .666.726Zm6.847-9.333L12 4.488l-1.333 1.3L8.88 4l1.3-1.333Zm-5.933 5.94L8 4.88l1.8 1.8-3.733 3.734-2 .186.18-1.993Z'
        }
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

export const EditImg = memo(ForwardRef)
