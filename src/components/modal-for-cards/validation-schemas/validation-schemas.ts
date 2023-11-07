import { z } from 'zod'

export const answerAndQuestionSchema = z.string().min(3).max(500)
export const namePackSchema = z.string().min(3).max(30)
export const privateCheckboxSchema = z.boolean().default(false)
