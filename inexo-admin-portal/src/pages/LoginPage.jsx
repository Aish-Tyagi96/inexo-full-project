import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import logo from '@/assets/images/brand/inexo-logo.svg'
import { FormTextField } from '@/components/forms'
import { setCredentials } from '@/features/auth/authSlice'
import { useLoginMutation } from '@/features/auth/authApi'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [login, { isLoading, error }] = useLoginMutation()
  const from = location.state?.from?.pathname || '/dashboard'
  const hasToken = Boolean(localStorage.getItem('inexo_admin_token'))

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@inexo.com',
      password: 'Admin@12345',
    },
  })

  const onSubmit = async (values) => {
    const response = await login(values).unwrap()
    dispatch(setCredentials({ token: response.data.token, user: response.data.user }))
    navigate(from, { replace: true })
  }

  if (hasToken) {
    return <Navigate replace to={from} />
  }

  return (
    <Box sx={{ alignItems: 'center', bgcolor: 'background.default', display: 'flex', minHeight: '100vh', p: 2 }}>
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', maxWidth: 460, mx: 'auto', p: { xs: 3, md: 4 }, width: '100%' }}>
        <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
          <Box component="img" src={logo} sx={{ height: 84, width: 84 }} />
          <Avatar sx={{ bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
          <Stack spacing={0.75} sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Admin Login</Typography>
            <Typography color="text.secondary">Sign in to manage Inexo website operations.</Typography>
          </Stack>
        </Stack>

        <FormProvider {...form}>
          <Stack component="form" onSubmit={form.handleSubmit(onSubmit)} spacing={2.5} sx={{ mt: 4 }}>
            {error ? <Alert severity="error">{error.data?.message || error.message || 'Login failed.'}</Alert> : null}
            <FormTextField label="Email address" name="email" />
            <FormTextField label="Password" name="password" type="password" />
            <Button disabled={isLoading} size="large" type="submit" variant="contained">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Stack>
        </FormProvider>
      </Paper>
    </Box>
  )
}
