import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign-in'
import { useLoginMutation } from '@/services/auth/auth-api'
import { SignUpParams } from '@/services/auth/types'

export const SignInPage = () => {
  const [logIn] = useLoginMutation()

  const navigate = useNavigate()

  const logInHandler = async (args: SignUpParams) => {
    try {
      await logIn(args)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignIn onSubmit={logInHandler} />
}
