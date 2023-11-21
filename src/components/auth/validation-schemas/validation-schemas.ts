import { z } from 'zod'

export const emailValidation = z.string().trim().min(1, 'Required').email()
export const passwordValidation = z.string().regex(/^\S*$/).min(6).max(20)
export const rememberMeValidation = z.boolean().default(false)
export const nameValidation = z.string().min(1, 'Required').min(3).max(10)

export const signUpSchema = z
  .object({
    confirmPassword: passwordValidation,
    email: emailValidation,
    password: passwordValidation,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const passwordSchema = z.object({
  password: passwordValidation,
})

export const nameSchema = z.object({
  name: nameValidation,
})

export const emailSchema = z.object({
  email: emailValidation,
})

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: rememberMeValidation,
})
