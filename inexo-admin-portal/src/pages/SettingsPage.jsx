import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { env } from '@/app/env'
import { PageHeader } from '@/components/common/PageHeader'

export default function SettingsPage() {
  return (
    <Box>
      <PageHeader
        description="Environment-based configuration for API fetching and admin runtime behavior."
        eyebrow="Configuration"
        title="Settings"
      />
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Typography fontWeight={700} variant="h6">API Base URL</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, wordBreak: 'break-all' }}>{env.apiBaseUrl}</Typography>
            <Button onClick={() => navigator.clipboard.writeText(env.apiBaseUrl)} startIcon={<ContentCopyIcon />} sx={{ mt: 2 }} variant="outlined">
              Copy base URL
            </Button>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Typography fontWeight={700} variant="h6">Data layer</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography color="text.secondary">Redux Toolkit Query: auth, users, roles and mutation workflows.</Typography>
              <Typography color="text.secondary">TanStack Query: dashboard health and non-Redux server-state checks.</Typography>
              <Typography color="text.secondary">React Hook Form: all admin forms and upload components.</Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
