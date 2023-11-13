import { useForm } from 'react-hook-form'

import { Button, ControlledRadioGroup, Typography } from '@/components'

import s from './learn-form.module.scss'

type Props = {
  onSubmit: any
}

export const LearnForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm({})

  const options = [
    {
      disable: false,
      title: 'Did not know',
    },
    {
      disable: false,
      title: 'forgot',
    },
    {
      disable: false,
      title: 'A lot of thought',
    },
    {
      disable: false,
      title: 'Confused',
    },
    {
      disable: false,
      title: 'Knew the answer',
    },
  ]

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={s.subtitle} variant={'subtitle1'}>
        Rate yourself:
      </Typography>
      <ControlledRadioGroup
        className={s.radioGroup}
        control={control}
        name={''}
        options={options}
      />
      <Button className={s.button} fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
