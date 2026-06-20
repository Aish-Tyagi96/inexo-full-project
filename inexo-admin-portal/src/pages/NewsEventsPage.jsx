import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { showToast } from '@/features/toast/toastSlice'
import { apiRequest } from '@/api/apiClient'
import { PageHeader } from '@/components/common/PageHeader'
import { FormImageUpload, FormTextField } from '@/components/forms'
import {
  useCreateNewsEventMutation,
  useDeleteNewsEventMutation,
  useGetNewsEventsQuery,
  useUpdateNewsEventMutation,
} from '@/features/newsEvents/newsEventsApi'
import {
  useCreateGalleryItemMutation,
  useDeleteGalleryItemMutation,
  useGetGalleryItemsQuery,
  useUpdateGalleryItemMutation,
} from '@/features/gallery/galleryApi'

const newsEventSchema = z.object({
  title: z.string().min(2, 'Title is required.'),
  description: z.string().optional(),
  fullDescription: z.string().optional(),
  image: z.any().optional(),
  imageAlt: z.string().optional(),
  eventDate: z.string().min(1, 'Date is required.'),
  readMoreHref: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
})

const galleryItemSchema = z.object({
  image: z.any().refine((val) => val !== null && val !== undefined && val !== '', 'Image is required.'),
  altText: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
})

async function uploadImageFile(file) {
  if (!file) {
    return ''
  }

  const body = new FormData()
  body.append('uploadImage', file)

  const response = await apiRequest('/uploadImage', { method: 'POST', body })
  return response.data.imageUrl
}

function normalizeImageValue(value, fallback = '') {
  if (!value) {
    return fallback
  }

  if (typeof value === 'string') {
    return value
  }

  return uploadImageFile(value)
}

function ActionButton({ color = 'inherit', disabled, label, onClick, children }) {
  return (
    <IconButton aria-label={label} color={color} disabled={disabled} onClick={onClick} size="small">
      {children}
    </IconButton>
  )
}

function NewsDialogFrame({ children, onClose, open, title }) {
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

function SectionTabs({ value, onChange }) {
  return (
    <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4 }}>
      <Tabs
        onChange={onChange}
        sx={{
          '& .MuiTab-root': {
            alignItems: 'flex-start',
            color: 'text.primary',
            fontSize: '1.05rem',
            fontWeight: 500,
            px: 3,
            py: 2.25,
            textTransform: 'none',
          },
          '& .Mui-selected': {
            color: 'primary.main !important',
            fontWeight: 700,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'secondary.main',
            height: 3,
          },
        }}
        value={value}
      >
        <Tab label="News Articles" value="articles" />
        <Tab label="Gallery Items" value="gallery" />
      </Tabs>
    </Box>
  )
}

export default function NewsEventsPage() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('articles')
  const [dialogState, setDialogState] = useState({ section: 'articles', mode: 'create', open: false, record: null })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, section: 'articles', id: null, message: '' })
  
  const newsQuery = useGetNewsEventsQuery(undefined, { skip: activeTab !== 'articles' })
  const galleryQuery = useGetGalleryItemsQuery(undefined, { skip: activeTab !== 'gallery' })

  const [createNewsEvent, createNewsEventState] = useCreateNewsEventMutation()
  const [updateNewsEvent, updateNewsEventState] = useUpdateNewsEventMutation()
  const [deleteNewsEvent, deleteNewsEventState] = useDeleteNewsEventMutation()

  const [createGalleryItem, createGalleryItemState] = useCreateGalleryItemMutation()
  const [updateGalleryItem, updateGalleryItemState] = useUpdateGalleryItemMutation()
  const [deleteGalleryItem, deleteGalleryItemState] = useDeleteGalleryItemMutation()

  const defaultDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  const newsForm = useForm({
    resolver: zodResolver(newsEventSchema),
    defaultValues: {
      title: '',
      description: '',
      fullDescription: '',
      image: null,
      imageAlt: '',
      eventDate: defaultDate,
      readMoreHref: '#',
      sortOrder: 0,
    },
  })

  const galleryForm = useForm({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: {
      image: null,
      altText: '',
      sortOrder: 0,
    },
  })

  const newsEvents = newsQuery.data?.data ?? []
  const galleryItems = galleryQuery.data?.data ?? []
  
  const isDialogBusy = createNewsEventState.isLoading
    || updateNewsEventState.isLoading
    || createGalleryItemState.isLoading
    || updateGalleryItemState.isLoading

  const openDialog = (section, mode = 'create', record = null) => {
    setDialogState({ section, mode, open: true, record })
  }

  const closeDialog = () => {
    const section = dialogState.section
    setDialogState({ section, mode: 'create', open: false, record: null })
    if (section === 'articles') {
      newsForm.reset({
        title: '',
        description: '',
        fullDescription: '',
        image: null,
        imageAlt: '',
        eventDate: defaultDate,
        readMoreHref: '#',
        sortOrder: 0,
      })
    } else {
      galleryForm.reset({
        image: null,
        altText: '',
        sortOrder: 0,
      })
    }
  }

  useEffect(() => {
    if (!dialogState.open || dialogState.section !== 'articles') {
      return
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      newsForm.reset({
        title: dialogState.record.title,
        description: dialogState.record.description || '',
        fullDescription: dialogState.record.fullDescription || '',
        image: dialogState.record.image || null,
        imageAlt: dialogState.record.imageAlt || '',
        eventDate: dialogState.record.date || defaultDate,
        readMoreHref: dialogState.record.readMoreHref || '#',
        sortOrder: dialogState.record.sortOrder ?? 0,
      })
      return
    }

    newsForm.reset({
      title: '',
      description: '',
      fullDescription: '',
      image: null,
      imageAlt: '',
      eventDate: defaultDate,
      readMoreHref: '#',
      sortOrder: 0,
    })
  }, [newsForm, dialogState, defaultDate])

  useEffect(() => {
    if (!dialogState.open || dialogState.section !== 'gallery') {
      return
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      galleryForm.reset({
        image: dialogState.record.src || null,
        altText: dialogState.record.alt || '',
        sortOrder: dialogState.record.sortOrder ?? 0,
      })
      return
    }

    galleryForm.reset({
      image: null,
      altText: '',
      sortOrder: 0,
    })
  }, [galleryForm, dialogState])

  const handleSubmitNews = async (values) => {
    try {
      const image = await normalizeImageValue(values.image, dialogState.record?.image || '')
      const payload = {
        title: values.title,
        description: values.description || '',
        fullDescription: values.fullDescription || '',
        image,
        imageAlt: values.imageAlt || values.title,
        eventDate: values.eventDate,
        readMoreHref: values.readMoreHref || '#',
        sortOrder: Number(values.sortOrder ?? 0),
      }

      if (dialogState.mode === 'edit' && dialogState.record) {
        await updateNewsEvent({ id: dialogState.record.id, ...payload }).unwrap()
        dispatch(showToast({ message: 'News event updated successfully.', severity: 'success' }))
      } else {
        await createNewsEvent(payload).unwrap()
        dispatch(showToast({ message: 'News event created successfully.', severity: 'success' }))
      }

      closeDialog()
    } catch {
      // Handled globally
    }
  }

  const handleSubmitGallery = async (values) => {
    try {
      const image = await normalizeImageValue(values.image, dialogState.record?.src || '')
      const payload = {
        image,
        altText: values.altText || '',
        sortOrder: Number(values.sortOrder ?? 0),
      }

      if (dialogState.mode === 'edit' && dialogState.record) {
        await updateGalleryItem({ id: dialogState.record.id, ...payload }).unwrap()
        dispatch(showToast({ message: 'Gallery item updated successfully.', severity: 'success' }))
      } else {
        await createGalleryItem(payload).unwrap()
        dispatch(showToast({ message: 'Gallery item created successfully.', severity: 'success' }))
      }

      closeDialog()
    } catch {
      // Handled globally
    }
  }

  const handleDeleteClick = (section, id) => {
    setDeleteConfirm({
      open: true,
      section,
      id,
      message: section === 'articles' ? 'Delete this news event?' : 'Delete this gallery item?',
    })
  }

  const confirmDelete = async () => {
    const { section, id } = deleteConfirm
    try {
      if (section === 'articles') {
        await deleteNewsEvent(id).unwrap()
        dispatch(showToast({ message: 'News event deleted successfully.', severity: 'success' }))
      } else {
        await deleteGalleryItem(id).unwrap()
        dispatch(showToast({ message: 'Gallery item deleted successfully.', severity: 'success' }))
      }
    } catch {
      // Handled globally
    } finally {
      setDeleteConfirm({ open: false, section: 'articles', id: null, message: '' })
    }
  }

  const activeTitle = activeTab === 'articles' ? 'News Articles' : 'Gallery Items'
  const activeCreateLabel = activeTab === 'articles' ? 'Create News Event' : 'Create Gallery Item'

  return (
    <Box>
      <PageHeader
        action={<Button onClick={() => openDialog(activeTab, 'create')} startIcon={<AddIcon />} variant="contained">{activeCreateLabel}</Button>}
        description="Publish and manage site updates, announcements, CSR event articles, and photo gallery."
        title="News & Events"
      />

      <SectionTabs onChange={(e, val) => setActiveTab(val)} value={activeTab} />

      {/* Global SnackbarToast handles notifications */}

      {activeTab === 'articles' ? (
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Order</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsQuery.isLoading ? (
                <EmptyRows colSpan={5} message="Loading news events..." />
              ) : newsEvents.length === 0 ? (
                <EmptyRows colSpan={5} message="No news events found. Click Create News Event to get started." />
              ) : (
                newsEvents.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      {item.image ? (
                        <Box
                          component="img"
                          src={item.image}
                          sx={{
                            height: 48,
                            width: 80,
                            objectFit: 'cover',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: 48,
                            width: 80,
                            bgcolor: 'action.hover',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          No image
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600} variant="body2">{item.title}</Typography>
                      <Typography color="text.secondary" noWrap sx={{ maxWidth: 350 }} variant="caption">
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.sortOrder}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <ActionButton
                          color="primary"
                          label="Edit event"
                          onClick={() => openDialog('articles', 'edit', item)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </ActionButton>
                        <ActionButton
                          color="error"
                          label="Delete event"
                          onClick={() => handleDeleteClick('articles', item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </ActionButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Alt Text</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Sort Order</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleryQuery.isLoading ? (
                <EmptyRows colSpan={4} message="Loading gallery items..." />
              ) : galleryItems.length === 0 ? (
                <EmptyRows colSpan={4} message="No gallery items found. Click Create Gallery Item to get started." />
              ) : (
                galleryItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box
                        component="img"
                        src={item.src}
                        sx={{
                          height: 48,
                          width: 80,
                          objectFit: 'cover',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{item.alt || 'No description'}</Typography>
                    </TableCell>
                    <TableCell>{item.sortOrder}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <ActionButton
                          color="primary"
                          label="Edit gallery item"
                          onClick={() => openDialog('gallery', 'edit', item)}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </ActionButton>
                        <ActionButton
                          color="error"
                          label="Delete gallery item"
                          onClick={() => handleDeleteClick('gallery', item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </ActionButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Dialog for News Articles */}
      <NewsDialogFrame
        onClose={closeDialog}
        open={dialogState.open && dialogState.section === 'articles'}
        title={dialogState.mode === 'edit' ? 'Edit News Event' : 'Create News Event'}
      >
        <FormProvider {...newsForm}>
          <Stack component="form" onSubmit={newsForm.handleSubmit(handleSubmitNews)} spacing={2.5}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField label="Event Title" name="title" required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField InputLabelProps={{ shrink: true }} label="Event Date" name="eventDate" type="date" required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField label="Read More Link (HREF)" name="readMoreHref" helperText="Defaults to '#'" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField label="Sort Order" name="sortOrder" type="number" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormTextField label="Short Description" multiline name="description" rows={2} helperText="Shown on summary cards." />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormTextField label="Full Description" multiline name="fullDescription" rows={5} helperText="Detailed content shown inside modal dialog." />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormImageUpload label="Article Image" name="image" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField label="Image Alt Text" name="imageAlt" helperText="Accessibility text for the image" />
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
      </NewsDialogFrame>

      {/* Dialog for Gallery Items */}
      <NewsDialogFrame
        onClose={closeDialog}
        open={dialogState.open && dialogState.section === 'gallery'}
        title={dialogState.mode === 'edit' ? 'Edit Gallery Item' : 'Create Gallery Item'}
      >
        <FormProvider {...galleryForm}>
          <Stack component="form" onSubmit={galleryForm.handleSubmit(handleSubmitGallery)} spacing={2.5}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormImageUpload label="Gallery Image" name="image" required />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField label="Alt Text / Caption" name="altText" helperText="Brief description of this image." />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormTextField label="Sort Order" name="sortOrder" type="number" />
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
      </NewsDialogFrame>

      {/* Delete Confirmation Dialog */}
      <Dialog
        onClose={() => setDeleteConfirm({ open: false, section: 'articles', id: null, message: '' })}
        open={deleteConfirm.open}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <Typography>{deleteConfirm.message}</Typography>
          <Typography color="error" sx={{ mt: 1.5 }} variant="caption">
            Warning: This action is permanent and cannot be undone.
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              color="inherit"
              onClick={() => setDeleteConfirm({ open: false, section: 'articles', id: null, message: '' })}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="error"
              disabled={deleteNewsEventState.isLoading || deleteGalleryItemState.isLoading}
              onClick={confirmDelete}
              variant="contained"
            >
              Deleting...
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
