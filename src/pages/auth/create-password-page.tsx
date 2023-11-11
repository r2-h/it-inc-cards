import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword, CreatePasswordFormValues } from '@/components'
import { ErrorType, authActions, useAppDispatch, useResetPasswordMutation } from '@/services'

export const CreatePasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()
  const dispatch = useAppDispatch()

  const [reset] = useResetPasswordMutation()

  const resetPasswordHandler = async ({ password }: CreatePasswordFormValues) => {
    try {
      await reset({ password, token: token ?? '' }).unwrap()
      navigate('/login')
    } catch (err) {
      const error = err as ErrorType

      dispatch(authActions.setError(error.data.message))
    }
  }

  return <CreateNewPassword onSubmit={resetPasswordHandler} />
}
