import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'

export function FormSelectField({ name, label, options = [], rules, helperText, ...props }) {
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
          select
          value={field.value ?? ''}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}
