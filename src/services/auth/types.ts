export type AuthResponse = {
  avatar?: File | undefined
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
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type UpdateUserParams = {
  avatar?: string
  email?: string
  name?: string
}
export type RecoverPasswordParams = {
  email: string
  html: string
  subject?: string
}
export type ResetPasswordParams = {
  password: string
  token: string
}

export type ErrorType = {
  data: {
    message: string
    path: string
    statusCode: number
    timestamp: string
  }
  status: number | string
}
