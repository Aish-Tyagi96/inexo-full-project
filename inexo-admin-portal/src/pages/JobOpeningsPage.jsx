import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { showToast } from '@/features/toast/toastSlice'
import { PageHeader } from '@/components/common/PageHeader'
import { FormTextField } from '@/components/forms'
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
} from '@/features/jobOpenings/jobOpeningsApi'

const jobSchema = z.object({
  title: z.string().min(2, 'Job title is required.'),
  description: z.string().min(2, 'Job description is required.'),
  link: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
})

function ActionButton({ color = 'inherit', disabled, label, onClick, children }) {
  return (
    <IconButton aria-label={label} color={color} disabled={disabled} onClick={onClick} size="small">
      {children}
    </IconButton>
  )
}

function JobDialogFrame({ children, onClose, open, title }) {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #0B3F79 0%, #082d57 100%)',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 700,
          pr: 7,
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{ color: '#fff', position: 'absolute', right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3.5 }}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function EmptyRows({ colSpan, message }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>
        {message}
      </TableCell>
    </TableRow>
  )
}

export default function JobOpeningsPage() {
  const dispatch = useDispatch()
  const [dialogState, setDialogState] = useState({ mode: 'create', open: false, record: null })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, title: '' })

  const { data: jobsResponse, isLoading, isError } = useGetJobsQuery()
  const [createJob, createJobState] = useCreateJobMutation()
  const [updateJob, updateJobState] = useUpdateJobMutation()
  const [deleteJob, deleteJobState] = useDeleteJobMutation()

  const jobs = jobsResponse?.data || []

  const formMethods = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      link: 'https://www.linkedin.com',
      sortOrder: 0,
    },
  })

  const { reset } = formMethods

  useEffect(() => {
    if (dialogState.open) {
      if (dialogState.mode === 'edit' && dialogState.record) {
        reset({
          title: dialogState.record.title,
          description: dialogState.record.description,
          link: dialogState.record.link || 'https://www.linkedin.com',
          sortOrder: dialogState.record.sortOrder || 0,
        })
      } else {
        reset({
          title: '',
          description: '',
          link: 'https://www.linkedin.com',
          sortOrder: 0,
        })
      }
    }
  }, [dialogState, reset])

  const openCreateDialog = () => {
    setDialogState({ mode: 'create', open: true, record: null })
  }

  const openEditDialog = (record) => {
    setDialogState({ mode: 'edit', open: true, record })
  }

  const closeDialog = () => {
    setDialogState((prev) => ({ ...prev, open: false }))
  }

  const handleSubmit = async (values) => {
    try {
      if (dialogState.mode === 'create') {
        await createJob(values).unwrap()
        dispatch(showToast({ message: 'Job opening created successfully!', severity: 'success' }))
      } else {
        await updateJob({ id: dialogState.record.id, ...values }).unwrap()
        dispatch(showToast({ message: 'Job opening updated successfully!', severity: 'success' }))
      }
      closeDialog()
    } catch (err) {
      dispatch(showToast({ message: err?.data?.message || 'Something went wrong.', severity: 'error' }))
    }
  }

  const openDeleteDialog = (record) => {
    setDeleteConfirm({ open: true, id: record.id, title: record.title })
  }

  const confirmDelete = async () => {
    try {
      await deleteJob(deleteConfirm.id).unwrap()
      dispatch(showToast({ message: 'Job opening deleted successfully!', severity: 'success' }))
      setDeleteConfirm({ open: false, id: null, title: '' })
    } catch (err) {
      dispatch(showToast({ message: err?.data?.message || 'Failed to delete job opening.', severity: 'error' }))
    }
  }

  const isDialogBusy = createJobState.isLoading || updateJobState.isLoading

  return (
    <Box>
      <PageHeader
        eyebrow="Careers"
        title="Job Openings"
        description="Manage active career opportunities and listings displayed on the corporate website."
        action={
          <Button
            startIcon={<AddIcon />}
            onClick={openCreateDialog}
            variant="contained"
          >
            Add Job Opening
          </Button>
        }
      />

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: 80 }}>Sort</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Job Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Link</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, pr: 3, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <EmptyRows colSpan={5} message="Loading job openings..." />
            ) : isError ? (
              <EmptyRows colSpan={5} message="Failed to load job openings." />
            ) : jobs.length === 0 ? (
              <EmptyRows colSpan={5} message="No job openings defined yet. Click 'Add Job Opening' to create one." />
            ) : (
              jobs.map((job) => (
                <TableRow hover key={job.id}>
                  <TableCell>{job.sortOrder}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{job.title}</TableCell>
                  <TableCell sx={{ maxW: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {job.description}
                  </TableCell>
                  <TableCell>
                    <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0B3F79', textDecoration: 'underline' }}>
                      Apply Link
                    </a>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <ActionButton label="Edit Job" onClick={() => openEditDialog(job)}>
                        <EditOutlinedIcon />
                      </ActionButton>
                      <ActionButton color="error" label="Delete Job" onClick={() => openDeleteDialog(job)}>
                        <DeleteIcon />
                      </ActionButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Create / Edit Dialog */}
      <JobDialogFrame
        onClose={closeDialog}
        open={dialogState.open}
        title={dialogState.mode === 'edit' ? 'Edit Job Opening' : 'Create Job Opening'}
      >
        <FormProvider {...formMethods}>
          <Stack component="form" onSubmit={formMethods.handleSubmit(handleSubmit)} spacing={2.5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <FormTextField label="Job Title" name="title" required />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormTextField label="Sort Order" name="sortOrder" type="number" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField label="Apply Link (URL)" name="link" helperText="LinkedIn, Indeed, or career portal link" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField label="Job Description" multiline name="description" rows={4} required />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button color="inherit" onClick={closeDialog} variant="outlined">Cancel</Button>
              <Button disabled={isDialogBusy} type="submit" variant="contained">
                {isDialogBusy ? 'Saving...' : dialogState.mode === 'edit' ? 'Update' : 'Create'}
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </JobDialogFrame>

      {/* Delete Confirm */}
      <Dialog
        onClose={() => setDeleteConfirm({ open: false, id: null, title: '' })}
        open={deleteConfirm.open}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <Typography>Are you sure you want to delete the job opening "{deleteConfirm.title}"?</Typography>
          <Typography color="error" sx={{ mt: 1.5 }} variant="caption">
            Warning: This action is permanent and cannot be undone.
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              color="inherit"
              onClick={() => setDeleteConfirm({ open: false, id: null, title: '' })}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="error"
              disabled={deleteJobState.isLoading}
              onClick={confirmDelete}
              variant="contained"
            >
              {deleteJobState.isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
