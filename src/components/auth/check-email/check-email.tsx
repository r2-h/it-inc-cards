import CheckEmailImg from '@/assets/check-email-img'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './check-email.module.scss'

export const CheckEmail = () => {
  return (
    <Card className={s.wrapper}>
      <Typography className={s.header} variant={'large'}>
        Check Email
      </Typography>
      <CheckEmailImg className={s.icon} />
      <Typography className={s.description} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button as={'a'} fullWidth href={'/login'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
