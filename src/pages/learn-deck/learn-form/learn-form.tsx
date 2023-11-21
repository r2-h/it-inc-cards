import { useForm } from 'react-hook-form'

import { Button, ControlledRadioGroup, Typography } from '@/components'

import s from './learn-form.module.scss'

type Props = {
  grade?: number
  onSubmit: any
}

export const LearnForm = ({ grade, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm()

  const options = [
    {
      title: 'Did not know',
      value: '1',
    },
    {
      title: 'forgot',
      value: '2',
    },
    {
      title: 'A lot of thought',
      value: '3',
    },
    {
      title: 'Confused',
      value: '4',
    },
    {
      title: 'Knew the answer',
      value: '5',
    },
  ]

  let defaultRadioValue = '1'

  if (grade) {
    if (grade > 1) {
      defaultRadioValue = grade.toString()
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant={'subtitle1'}>Rate yourself:</Typography>
      <ControlledRadioGroup
        className={s.radioGroup}
        control={control}
        defaultValue={defaultRadioValue}
        name={'cardId'}
        options={options}
      />
      <Button className={s.button} fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
