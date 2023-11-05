import { EditProfile } from '@/components/auth/edit-profile'
import { EditProfileFormValues } from '@/components/auth/edit-profile/edit-mode-on'
import { useMeQuery, useUpdateUserMutation } from '@/services/auth/auth-api'

export const EditProfilePage = () => {
  const { data } = useMeQuery()
  const [edit] = useUpdateUserMutation()

  const editProfileHandler = async (args: EditProfileFormValues) => {
    try {
      await edit(args)
    } catch (e) {
      console.log(e)
    }
  }

  return <EditProfile email={data?.email} name={data?.name} onSubmit={editProfileHandler} />
}
