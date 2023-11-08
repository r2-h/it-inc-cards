import { useNavigate } from 'react-router-dom'

import { ForgotPassword, ForgotPasswordFormValues } from '@/components/auth/forgot-password'
import { useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const [recover] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const recoverHandler = async ({ email }: ForgotPasswordFormValues) => {
    try {
      await recover({
        email,
        html: '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/create-password/##token##">here</a> to recover your password</p>',
      })
      navigate('/check-email')
    } catch (e) {
      console.log(e)
    }
  }

  return <ForgotPassword onSubmit={recoverHandler} />
}
