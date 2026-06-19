import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'

export function FormTextField({ name, label, type = 'text', rules, helperText, ...props }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={Boolean(fieldState.error)}
          fullWidth
          helperText={fieldState.error?.message || helperText}
          label={label}
          type={type}
          value={field.value ?? ''}
        />
      )}
    />
  )
}
