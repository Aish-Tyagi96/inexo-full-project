import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { apiRequest } from '@/api/apiClient'
import { PageHeader } from '@/components/common/PageHeader'

export default function DashboardPage() {
  const healthQuery = useQuery({
    queryKey: ['backend-health'],
    queryFn: () => apiRequest('/health'),
  })

  const statsQuery = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiRequest('/dashboard/stats'),
  })

  const stats = statsQuery.data?.data || {}

  const overview = [
    { label: 'Products', value: stats.products ?? 0 },
    { label: 'Solutions', value: stats.solutions ?? 0 },
    { label: 'Media', value: stats.media ?? 0 },
    { label: 'Users', value: stats.users ?? 0 },
  ]

  const chartData = [
    { name: 'Products', count: stats.products ?? 0 },
    { name: 'Solutions', count: stats.solutions ?? 0 },
    { name: 'News', count: stats.news ?? 0 },
    { name: 'Media', count: stats.media ?? 0 },
  ]

  return (
    <Box>
      <PageHeader
        description="Monitor API health and manage the high-level website content workflow."
        eyebrow="Overview"
        title="Dashboard"
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Stack direction="row" spacing={2}>
              <CheckCircleIcon color={healthQuery.isSuccess ? 'success' : 'disabled'} />
              <Box>
                <Typography fontWeight={700}>Backend status</Typography>
                <Typography color="text.secondary" variant="body2">
                  {healthQuery.isLoading ? 'Checking API...' : healthQuery.isError ? healthQuery.error.message : healthQuery.data?.message}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        {overview.map((item) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6, md: 2 }}>
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
              <Typography color="text.secondary" variant="body2">{item.label}</Typography>
              <Typography sx={{ mt: 1 }} variant="h4">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: 360, p: 3 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>Content volume</Typography>
            <Box sx={{ overflowX: 'auto', width: '100%' }}>
              <BarChart data={chartData} height={280} width={820}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0B3F79" radius={[6, 6, 0, 0]} />
              </BarChart>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
