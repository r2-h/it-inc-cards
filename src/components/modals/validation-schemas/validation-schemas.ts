import { z } from 'zod'

export const answerAndQuestionSchema = z.string().min(3).max(500)
export const namePackSchema = z.string().min(3).max(30)
export const privateCheckboxSchema = z.boolean().default(false)

const urlSchema = z.string().url()
const emptyStringSchema = z.literal('')

export const videoSchema = urlSchema.or(emptyStringSchema)

export const addNewCardSchema = z.object({
  answer: answerAndQuestionSchema,
  answerImg: z.any(),
  answerVideo: videoSchema,
  question: answerAndQuestionSchema,
  questionImg: z.any(),
  questionVideo: videoSchema,
})

export const addNewDeckSchema = z.object({
  image: z.any(),
  isPrivate: privateCheckboxSchema,
  name: namePackSchema,
})
