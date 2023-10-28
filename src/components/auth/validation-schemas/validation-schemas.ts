import { z } from 'zod'

export const emailValidation = z.string().trim().min(1, 'Required').email()
export const passwordValidation = z.string().regex(/^\S*$/).min(6).max(20)
export const rememberMeValidation = z.boolean().default(false)
export const nameValidation = z.string().min(1, 'Required').min(3).max(10)
