import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export function FormSection({ title, description, children }) {
  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: { xs: 2, md: 3 } }}>
      <Stack spacing={2.5}>
        <Stack spacing={0.5}>
          <Typography variant="h6">{title}</Typography>
          {description ? <Typography color="text.secondary" variant="body2">{description}</Typography> : null}
        </Stack>
        {children}
      </Stack>
    </Paper>
  )
}
