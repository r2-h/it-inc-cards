import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/components'
import { ErrorType, LoginParams, authActions, useAppDispatch, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const [logIn] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logInHandler = async (args: LoginParams) => {
    try {
      await logIn(args).unwrap()
      navigate('/')
    } catch (err: unknown) {
      const error = err as ErrorType

      dispatch(authActions.setError(error.data.message))
    }
  }

  return <SignIn onSubmit={logInHandler} />
}
