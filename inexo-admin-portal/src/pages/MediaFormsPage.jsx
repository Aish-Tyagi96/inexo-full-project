import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { apiRequest } from '@/api/apiClient'
import { PageHeader } from '@/components/common/PageHeader'
import { FormFileUpload, FormImageUpload, FormSection, FormSelectField, FormTextField } from '@/components/forms'

const mediaSchema = z.object({
  title: z.string().min(2, 'Title is required.'),
  category: z.string().min(2, 'Category is required.'),
  description: z.string().min(10, 'Description needs more detail.'),
  image: z.any().optional(),
  document: z.any().optional(),
})

const categoryOptions = [
  { label: 'Homepage Banner', value: 'Homepage Banner' },
  { label: 'Product Media', value: 'Product Media' },
  { label: 'News Event', value: 'News Event' },
]

export default function MediaFormsPage() {
  const [submitError, setSubmitError] = useState('')
  const [submitResult, setSubmitResult] = useState(null)
  const form = useForm({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: '',
      category: 'Homepage Banner',
      description: '',
      image: null,
      document: null,
    },
  })

  const onSubmit = async (values) => {
    try {
      setSubmitError('')
      setSubmitResult(null)

      let imageUrl = ''
      let pdfUrl = ''

      if (values.image) {
        const imageBody = new FormData()
        imageBody.append('uploadImage', values.image)
        const imageResponse = await apiRequest('/uploadImage', { method: 'POST', body: imageBody })
        imageUrl = imageResponse.data.imageUrl
      }

      if (values.document) {
        const documentBody = new FormData()
        documentBody.append('uploadPdf', values.document)
        const documentResponse = await apiRequest('/uploadPdf', { method: 'POST', body: documentBody })
        pdfUrl = documentResponse.data.pdfUrl
      }

      setSubmitResult({
        category: values.category,
        description: values.description,
        imageUrl,
        pdfUrl,
        title: values.title,
      })
    } catch (error) {
      setSubmitError(error.message || 'Unable to upload media.')
    }
  }

  return (
    <Box>
      <PageHeader
        description="Reusable React Hook Form inputs for text, select, image upload, and file upload workflows."
        eyebrow="Form System"
        title="Media Forms"
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <FormProvider {...form}>
            <Stack component="form" onSubmit={form.handleSubmit(onSubmit)} spacing={2.5}>
              {submitError ? <Alert severity="error">{submitError}</Alert> : null}
              {submitResult ? <Alert severity="success">Media uploaded successfully. Image: {submitResult.imageUrl || 'None'}, PDF: {submitResult.pdfUrl || 'None'}</Alert> : null}
              <FormSection description="Use this pattern for banners, products, solutions, news and document-driven CMS entries." title="Content details">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}><FormTextField label="Title" name="title" /></Grid>
                  <Grid size={{ xs: 12, md: 6 }}><FormSelectField label="Category" name="category" options={categoryOptions} /></Grid>
                  <Grid size={{ xs: 12 }}><FormTextField label="Description" multiline name="description" rows={4} /></Grid>
                </Grid>
              </FormSection>

              <FormSection description="Components are ready for API FormData payloads when upload endpoints are added." title="Uploads">
                <Stack spacing={2.5}>
                  <FormImageUpload label="Upload preview image" name="image" />
                  <FormFileUpload accept=".pdf" label="Upload PDF document" name="document" />
                </Stack>
              </FormSection>

              <Box>
                <Button size="large" type="submit" variant="contained">Save media item</Button>
              </Box>
            </Stack>
          </FormProvider>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
            <Typography fontWeight={700} variant="h6">Included form components</Typography>
            <Stack component="ul" spacing={1.25} sx={{ color: 'text.secondary', pl: 2 }}>
              <li>Text input field</li>
              <li>Textarea field</li>
              <li>Select dropdown</li>
              <li>Image upload with preview</li>
              <li>PDF upload to the backend</li>
              <li>Validation with Zod and React Hook Form</li>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
