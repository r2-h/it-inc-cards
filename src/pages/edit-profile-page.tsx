import { EditProfile } from '@/components/auth/edit-profile'
import { useMeQuery } from '@/services/auth/auth-api'

export const EditProfilePage = () => {
  const { data } = useMeQuery()

  return <EditProfile email={data?.email} name={data?.name} />
}
