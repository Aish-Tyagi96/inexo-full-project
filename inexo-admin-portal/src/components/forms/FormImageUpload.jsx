import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Controller, useFormContext } from 'react-hook-form'

export function FormImageUpload({ name, label = 'Upload image', rules }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
        const preview = value ? (typeof value === 'string' ? value : URL.createObjectURL(value)) : ''

        return (
          <Box>
            <Stack direction="row" gap={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <Avatar src={preview} sx={{ bgcolor: 'primary.light', height: 72, width: 72 }} variant="rounded" />
              <Box>
                <Button component="label" startIcon={<CloudUploadIcon />} variant="outlined">
                  {label}
                  <input
                    accept="image/*"
                    hidden
                    onChange={(event) => onChange(event.target.files?.[0] ?? null)}
                    type="file"
                  />
                </Button>
                <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                  JPG, PNG, WebP up to your backend limit.
                </Typography>
              </Box>
            </Stack>
            {fieldState.error ? <FormHelperText error>{fieldState.error.message}</FormHelperText> : null}
          </Box>
        )
      }}
    />
  )
}
