import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword, CreatePasswordFormValues } from '@/components/auth/create-new-password'
import { useResetPasswordMutation } from '@/services'

export const CreatePasswordPage = () => {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()

  const [reset] = useResetPasswordMutation()

  const resetPasswordHandler = async ({ password }: CreatePasswordFormValues) => {
    try {
      await reset({ password, token: token ?? '' })
      navigate('/login')
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateNewPassword onSubmit={resetPasswordHandler} />
}
