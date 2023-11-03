import Error404Img from '@/assets/error-404-img'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './error404.module.scss'

export const Error404 = () => {
  return (
    <div className={s.wrapper}>
      <Error404Img />
      <Typography className={s.text} variant={'body2'}>
        Sorry! Page not found!
      </Typography>
      <Button as={'a'} href={'/'}>
        Back to home page
      </Button>
    </div>
  )
}
