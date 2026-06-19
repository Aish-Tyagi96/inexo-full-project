import AttachFileIcon from '@mui/icons-material/AttachFile'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Controller, useFormContext } from 'react-hook-form'

export function FormFileUpload({ name, label, accept, rules, multiple = false }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
        const files = multiple ? Array.from(value || []) : value ? [value] : []

        return (
          <Box>
            <Stack direction="row" gap={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <Button component="label" startIcon={<AttachFileIcon />} variant="outlined">
                {label}
                <input
                  accept={accept}
                  hidden
                  multiple={multiple}
                  onChange={(event) => onChange(multiple ? event.target.files : event.target.files?.[0] ?? null)}
                  type="file"
                />
              </Button>
              <Typography color="text.secondary" variant="body2">
                {files.length ? files.map((file) => file.name).join(', ') : 'No file selected'}
              </Typography>
            </Stack>
            {fieldState.error ? <FormHelperText error>{fieldState.error.message}</FormHelperText> : null}
          </Box>
        )
      }}
    />
  )
}
