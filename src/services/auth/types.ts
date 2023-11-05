export type AuthResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}
export type SignUpParams = {
  email: string
  html: string
  name: string
  password: string
  sendConfirmationEmail: boolean
  subject: string
}
