import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'
import { useSignUpMutation } from '@/services/auth/auth-api'
import { SignUpParams } from '@/services/auth/types'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const signUpHandler = async (args: SignUpParams) => {
    try {
      await signUp(args)
      navigate('/edit-profile')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUp onSubmit={signUpHandler} />
}
