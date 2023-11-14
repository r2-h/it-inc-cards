import { useForm } from 'react-hook-form'

import { Button, ControlledRadioGroup, Typography } from '@/components'

import s from './learn-form.module.scss'

type Props = {
  onSubmit: any
}

export const LearnForm = ({ onSubmit }: Props) => {
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

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography className={s.subtitle} variant={'subtitle1'}>
        Rate yourself:
      </Typography>
      <ControlledRadioGroup
        className={s.radioGroup}
        control={control}
        defaultValue={'1'}
        name={'radio'}
        options={options}
      />
      <Button className={s.button} fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
