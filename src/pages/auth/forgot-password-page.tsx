import { useNavigate } from 'react-router-dom'

import { ForgotPassword, ForgotPasswordFormValues } from '@/components'
import { ErrorType, authActions, useAppDispatch, useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const [recover] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const recoverHandler = async ({ email }: ForgotPasswordFormValues) => {
    try {
      await recover({
        email,
        html: '<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/create-password/##token##">here</a> to recover your password</p>',
      }).unwrap()
      navigate('/check-email')
    } catch (err: unknown) {
      const error = err as ErrorType

      dispatch(authActions.setError(error.data.message))
    }
  }

  return <ForgotPassword onSubmit={recoverHandler} />
}
