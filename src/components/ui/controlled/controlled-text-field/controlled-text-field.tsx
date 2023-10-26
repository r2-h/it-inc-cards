import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/text-field'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<TextFieldProps, 'name' | 'onChange' | 'value'>

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <TextField
      {...{
        id: name,
        onChange: onChange,
        value: value,
        ...textFieldProps,
      }}
    />
  )
}
