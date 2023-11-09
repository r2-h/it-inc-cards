import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign-in'
import { useLoginMutation, useMeQuery } from '@/services/auth/auth-api'
import { SignUpParams } from '@/services/auth/types'

export const SignInPage = () => {
  const [logIn] = useLoginMutation()
  const { isError, isLoading } = useMeQuery()
  const logInHandler = async (args: SignUpParams) => {
    await logIn(args)
  }

  if (isLoading) {
    return <div>...loading</div>
  }
  const isAuthenticated = !isError

  if (isAuthenticated) {
    return <Navigate replace to={'/'} />
  }

  return <SignIn onSubmit={logInHandler} />
}
