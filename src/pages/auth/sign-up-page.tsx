import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components'
import { SignUpParams, authActions, useAppDispatch, useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const signUpHandler = async (args: SignUpParams) => {
    try {
      await signUp(args).unwrap()
      navigate('/login')
    } catch (err: unknown) {
      const error = err as ErrorType

      dispatch(authActions.setError(error.data.errorMessages[0]))
    }
  }

  return <SignUp onSubmit={signUpHandler} />
}

type ErrorType = {
  data: {
    errorMessages: string[]
  }
  status: number | string
}
