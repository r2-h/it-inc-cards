import { useForm } from 'react-hook-form'

import { answerAndQuestionSchema } from '@/components/modal-for-cards/validationSchemas'
import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Select } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './add-and-edit-card.module.scss'

const addNewCardSchema = z.object({
  answer: answerAndQuestionSchema,
  question: answerAndQuestionSchema,
})

export type AddCardsFormValues = z.infer<typeof addNewCardSchema>

type AddNewCardProps = {
  onSubmit?: any
  variant: 'add' | 'edit'
}

export const AddAndEditCard = ({ onSubmit, variant }: AddNewCardProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AddCardsFormValues>({
    defaultValues: {
      answer: '',
      question: '',
    },
    resolver: zodResolver(addNewCardSchema),
  })

  const options = [
    { id: '1', value: 'Text' },
    { id: '2', value: 'Image' },
    { id: '3', value: 'Video' },
  ]
  const textButton = variant === 'add' ? 'Add New Card' : 'Save Changes'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapperForm}>
        <Select
          className={s.select}
          defaultValue={'Text'}
          fullWidth
          label={'Choose a question format'}
          onChangeValue={() => {}}
          options={options}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.question?.message}
          fullWidth
          label={'Question'}
          name={'question'}
        />
        <ControlledTextField
          control={control}
          errorMessage={errors.answer?.message}
          fullWidth
          label={'Answer'}
          name={'answer'}
        />
      </div>
      <div className={s.buttons}>
        <DialogClose>
          <Button type={'button'} variant={'secondary'}>
            Cancel
          </Button>
        </DialogClose>
        <Button type={'submit'} variant={'primary'}>
          {textButton}
        </Button>
      </div>
    </form>
  )
}
