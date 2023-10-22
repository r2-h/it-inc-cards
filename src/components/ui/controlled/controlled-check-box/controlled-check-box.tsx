import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxDemo, CheckboxDemoProps } from '@/components/ui/check-box'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<CheckboxDemoProps, 'id' | 'onChange' | 'value'>

export const ControlledCheckBox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
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
    <CheckboxDemo
      {...{
        checked: value,
        id: name,
        onChange: onChange,
        ...checkboxProps,
      }}
    />
  )
}
