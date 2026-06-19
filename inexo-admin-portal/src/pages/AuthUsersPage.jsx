import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { PageHeader } from '@/components/common/PageHeader'
import { FormImageUpload, FormSelectField, FormTextField } from '@/components/forms'
import { useCreateAuthUserMutation, useGetAuthUsersQuery, useGetRolesQuery } from '@/features/auth/authApi'

const authUserSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().min(8, 'Phone is required.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
  roleName: z.string().min(2, 'Choose a role.'),
  profileImage: z.any().optional(),
})

export default function AuthUsersPage() {
  const usersQuery = useGetAuthUsersQuery()
  const rolesQuery = useGetRolesQuery()
  const [createAuthUser, createState] = useCreateAuthUserMutation()
  const form = useForm({
    resolver: zodResolver(authUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      roleName: 'Admin',
      profileImage: null,
    },
  })

  const roleOptions = (rolesQuery.data?.data ?? []).map((role) => ({ label: role.roleName, value: role.roleName }))

  const onSubmit = async (values) => {
    const payload = { ...values, profileImage: '' }

    await createAuthUser(payload).unwrap()
    form.reset({ name: '', email: '', phone: '', password: '', roleName: 'Admin', profileImage: null })
  }

  return (
    <Box>
      <PageHeader
        description="Create and review authenticated admin users using Redux Toolkit Query."
        eyebrow="Access Control"
        title="Auth Users"
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Typography fontWeight={700} variant="h6">Create auth user</Typography>
            <FormProvider {...form}>
              <Stack component="form" onSubmit={form.handleSubmit(onSubmit)} spacing={2.5} sx={{ mt: 2.5 }}>
                {createState.isError ? <Alert severity="error">{createState.error?.data?.message || 'Unable to create user.'}</Alert> : null}
                {createState.isSuccess ? <Alert severity="success">User created successfully.</Alert> : null}
                <FormImageUpload label="Profile image" name="profileImage" />
                <FormTextField label="Name" name="name" />
                <FormTextField label="Email" name="email" />
                <FormTextField label="Phone" name="phone" />
                <FormTextField label="Password" name="password" type="password" />
                <FormSelectField label="Role" name="roleName" options={roleOptions.length ? roleOptions : [{ label: 'Admin', value: 'Admin' }]} />
                <Button disabled={createState.isLoading} type="submit" variant="contained">
                  {createState.isLoading ? 'Creating...' : 'Create user'}
                </Button>
              </Stack>
            </FormProvider>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            <Box sx={{ p: 3 }}>
              <Typography fontWeight={700} variant="h6">Existing users</Typography>
              <Typography color="text.secondary" variant="body2">Fetched from backend using RTK Query.</Typography>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(usersQuery.data?.data ?? []).map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.userRole}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {usersQuery.isLoading ? <Typography sx={{ p: 3 }}>Loading users...</Typography> : null}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
