import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { apiRequest } from '@/api/apiClient'
import { PageHeader } from '@/components/common/PageHeader'
import { FormFileUpload, FormImageUpload, FormSection, FormSelectField, FormTextField } from '@/components/forms'
import {
  useCreateCategoryMutation,
  useCreateProductMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteProductMutation,
  useDeleteSubCategoryMutation,
  useGetCatalogTreeQuery,
  useUpdateCategoryMutation,
  useUpdateProductMutation,
  useUpdateSubCategoryMutation,
} from '@/features/catalog/catalogApi'

const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required.'),
  description: z.string().optional(),
  cardTitle: z.string().optional(),
  cardDescription: z.string().optional(),
  image: z.any().optional(),
  carouselImage: z.any().optional(),
  carouselText: z.string().optional(),
})

const subCategorySchema = z.object({
  categoryId: z.string().min(1, 'Choose a category.'),
  name: z.string().min(2, 'Sub-category name is required.'),
  description: z.string().optional(),
  cardTitle: z.string().optional(),
  cardDescription: z.string().optional(),
  image: z.any().optional(),
  carouselImage: z.any().optional(),
  carouselText: z.string().optional(),
})

const productDetailItemSchema = z.object({
  title: z.string().optional(),
  points: z.array(z.object({
    value: z.string().optional(),
  })).default([{ value: '' }]),
})

const productSchema = z.object({
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  name: z.string().min(2, 'Product name is required.'),
  description: z.string().optional(),
  cardTitle: z.string().optional(),
  cardDescription: z.string().optional(),
  image: z.any().optional(),
  carouselImage: z.any().optional(),
  carouselDescription: z.string().optional(),
  gallery: z.any().optional(),
  featureItems: z.array(productDetailItemSchema).default([{ title: '', points: [{ value: '' }] }]),
  benefitItems: z.array(productDetailItemSchema).default([{ title: '', points: [{ value: '' }] }]),
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

async function uploadGalleryFiles(fileList) {
  const files = Array.from(fileList || [])

  if (!files.length) {
    return []
  }

  const body = new FormData()
  files.forEach((file) => body.append('uploadFiles', file))

  const response = await apiRequest('/multiplefiles', { method: 'POST', body })
  return (response.data.files ?? []).filter((file) => file.fileType === 'image').map((file) => file.fileUrl)
}

function emptyDetailPoint() {
  return { value: '' }
}

function emptyDetailItem() {
  return { title: '', points: [emptyDetailPoint()] }
}

function toDetailFormItem(item = {}) {
  const points = Array.isArray(item?.points) && item.points.length
    ? item.points
    : typeof item?.description === 'string'
      ? item.description.split(/\r?\n/).map((point) => point.trim()).filter(Boolean)
      : []

  return {
    title: item?.title || '',
    points: points.length ? points.map((value) => ({ value })) : [emptyDetailPoint()],
  }
}

function normalizeDetailItems(items = []) {
  return items
    .map((item) => ({
      title: item?.title?.trim() || '',
      points: (item?.points || []).map((point) => point?.value?.trim() || '').filter(Boolean),
    }))
    .filter((item) => item.title || item.points.length)
    .map((item) => ({
      title: item.title,
      description: item.points.join('\n'),
    }))
}

function itemHasAtLeastOneText(item = {}) {
  return (item?.points || []).some((point) => point?.value?.trim())
}

function normalizeFeatureItems(items = []) {
  return normalizeDetailItems(items)
}

function normalizeBenefitItems(items = []) {
  return normalizeDetailItems(items)
}

function ActionButton({ color = 'inherit', disabled, label, onClick, children }) {
  return (
    <IconButton aria-label={label} color={color} disabled={disabled} onClick={onClick} size="small">
      {children}
    </IconButton>
  )
}

function ProductDetailItemCard({ control, index, isOnlyItem, itemName, onRemove, productForm, removeLabel }) {
  const pointFieldArray = useFieldArray({ control, name: `${itemName}.${index}.points` })

  return (
    <Paper sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2.5 }} variant="outlined">
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 11 }}>
            <TextField
              fullWidth
              helperText="Optional"
              label="Title"
              {...productForm.register(`${itemName}.${index}.title`)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <Stack alignItems={{ xs: 'flex-end', md: 'center' }} height="100%" justifyContent="center">
              <ActionButton
                color="error"
                label={removeLabel}
                onClick={() => {
                  if (isOnlyItem) {
                    productForm.setValue(`${itemName}.${index}`, emptyDetailItem(), { shouldValidate: true })
                    return
                  }

                  onRemove(index)
                }}
              >
                <DeleteIcon fontSize="small" />
              </ActionButton>
            </Stack>
          </Grid>
        </Grid>

        <Stack alignItems={{ xs: 'stretch', md: 'center' }} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1.5}>
          <Typography fontSize="0.95rem" fontWeight={600}>Texts</Typography>
          <Button onClick={() => pointFieldArray.append(emptyDetailPoint())} size="small" startIcon={<AddIcon />} variant="outlined">Add text</Button>
        </Stack>

        <Stack spacing={1.5}>
          {pointFieldArray.fields.map((pointField, pointIndex) => (
            <Stack alignItems="flex-start" direction={{ xs: 'column', md: 'row' }} key={pointField.id} spacing={1.5}>
              <TextField
                fullWidth
                helperText={pointIndex === 0 ? 'At least one text is required. Use + to add more.' : ' '}
                label={`Text ${pointIndex + 1}`}
                {...productForm.register(`${itemName}.${index}.points.${pointIndex}.value`)}
              />
              <ActionButton
                color="error"
                label="Remove text"
                onClick={() => {
                  if (pointFieldArray.fields.length === 1) {
                    productForm.setValue(`${itemName}.${index}.points.${pointIndex}`, emptyDetailPoint(), { shouldValidate: true })
                    return
                  }

                  pointFieldArray.remove(pointIndex)
                }}
              >
                <DeleteIcon fontSize="small" />
              </ActionButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
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
        variant="scrollable"
      >
        <Tab label="Categories" value="categories" />
        <Tab label="Subcategories" value="subCategories" />
        <Tab label="Products" value="products" />
      </Tabs>
    </Box>
  )
}

function CatalogDialogFrame({ children, onClose, open, title }) {
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

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState('categories')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [feedback, setFeedback] = useState(null)
  const [dialogState, setDialogState] = useState({ mode: 'create', section: 'categories', open: false, record: null })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: null, message: '' })
  const catalogQuery = useGetCatalogTreeQuery()
  const [createCategory, createCategoryState] = useCreateCategoryMutation()
  const [createSubCategory, createSubCategoryState] = useCreateSubCategoryMutation()
  const [createProduct, createProductState] = useCreateProductMutation()
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation()
  const [updateSubCategory, updateSubCategoryState] = useUpdateSubCategoryMutation()
  const [updateProduct, updateProductState] = useUpdateProductMutation()
  const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation()
  const [deleteSubCategory, deleteSubCategoryState] = useDeleteSubCategoryMutation()
  const [deleteProduct, deleteProductState] = useDeleteProductMutation()

  const categoryForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselText: '',
    },
  })
  const subCategoryForm = useForm({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      categoryId: '',
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselText: '',
    },
  })
  const productForm = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: '',
      subCategoryId: '',
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselDescription: '',
      gallery: null,
      featureItems: [emptyDetailItem()],
      benefitItems: [emptyDetailItem()],
    },
  })
  const featureFieldArray = useFieldArray({ control: productForm.control, name: 'featureItems' })
  const benefitFieldArray = useFieldArray({ control: productForm.control, name: 'benefitItems' })

  const categories = catalogQuery.data?.data?.categories ?? []
  const subCategories = catalogQuery.data?.data?.subCategories ?? []
  const products = catalogQuery.data?.data?.products ?? []
  const selectedCategoryId = Number(productForm.watch('categoryId') || 0)

  const categoryOptions = categories.map((category) => ({ label: category.name, value: String(category.id) }))
  const productSubCategoryOptions = subCategories
    .filter((subCategory) => !selectedCategoryId || subCategory.categoryId === selectedCategoryId)
    .map((subCategory) => ({ label: subCategory.name, value: String(subCategory.id) }))
  const isDialogBusy = createCategoryState.isLoading
    || createSubCategoryState.isLoading
    || createProductState.isLoading
    || updateCategoryState.isLoading
    || updateSubCategoryState.isLoading
    || updateProductState.isLoading

  const visibleRows = useMemo(() => {
    const allRows = activeTab === 'categories' ? categories : activeTab === 'subCategories' ? subCategories : products
    return allRows.slice(0, rowsPerPage)
  }, [activeTab, categories, products, rowsPerPage, subCategories])

  const openDialog = (section, mode = 'create', record = null) => {
    setFeedback(null)
    setDialogState({ mode, open: true, record, section })
  }

  const closeDialog = () => {
    setDialogState({ mode: 'create', section: activeTab, open: false, record: null })
    categoryForm.reset({
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselText: '',
    })
    subCategoryForm.reset({
      categoryId: '',
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselText: '',
    })
    productForm.reset({
      categoryId: '',
      subCategoryId: '',
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselDescription: '',
      gallery: null,
      featureItems: [emptyDetailItem()],
      benefitItems: [emptyDetailItem()],
    })
  }

  useEffect(() => {
    if (!dialogState.open || dialogState.section !== 'categories') {
      return
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      categoryForm.reset({
        name: dialogState.record.name,
        description: dialogState.record.description,
        cardTitle: dialogState.record.cardTitle || dialogState.record.name,
        cardDescription: dialogState.record.cardDescription || dialogState.record.description,
        image: dialogState.record.image,
        carouselImage: dialogState.record.carouselImage || dialogState.record.image,
        carouselText: dialogState.record.carouselText || dialogState.record.description || dialogState.record.name,
      })
      return
    }

    categoryForm.reset({
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselText: '',
    })
  }, [categoryForm, dialogState])

  useEffect(() => {
    if (!dialogState.open || dialogState.section !== 'subCategories') {
      return
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      subCategoryForm.reset({
        categoryId: String(dialogState.record.categoryId ?? ''),
        name: dialogState.record.name,
        description: dialogState.record.description,
        cardTitle: dialogState.record.cardTitle || dialogState.record.name,
        cardDescription: dialogState.record.cardDescription || dialogState.record.description,
        image: dialogState.record.image,
        carouselImage: dialogState.record.carouselImage || dialogState.record.image,
        carouselText: dialogState.record.carouselText || dialogState.record.description || dialogState.record.name,
      })
      return
    }

    subCategoryForm.reset({
      categoryId: '',
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselText: '',
    })
  }, [dialogState, subCategoryForm])

  useEffect(() => {
    if (!dialogState.open || dialogState.section !== 'products') {
      return
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      productForm.reset({
        categoryId: dialogState.record.categoryId ? String(dialogState.record.categoryId) : '',
        subCategoryId: dialogState.record.subCategoryId ? String(dialogState.record.subCategoryId) : '',
        name: dialogState.record.name,
        description: dialogState.record.description || '',
        cardTitle: dialogState.record.cardTitle || dialogState.record.name,
        cardDescription: dialogState.record.cardDescription || dialogState.record.description || '',
        image: null,
        carouselImage: null,
        carouselDescription: dialogState.record.carouselDescription || dialogState.record.description || dialogState.record.name,
        gallery: null,
        featureItems: dialogState.record.features?.length
          ? dialogState.record.features.map((feature) => toDetailFormItem(feature))
          : [emptyDetailItem()],
        benefitItems: dialogState.record.benefits?.length
          ? dialogState.record.benefits.map((benefit) => toDetailFormItem(benefit))
          : [emptyDetailItem()],
      })
      return
    }

    productForm.reset({
      categoryId: '',
      subCategoryId: '',
      name: '',
      description: '',
      cardTitle: '',
      cardDescription: '',
      image: null,
      carouselImage: null,
      carouselDescription: '',
      gallery: null,
      featureItems: [emptyDetailItem()],
      benefitItems: [emptyDetailItem()],
    })
  }, [dialogState, productForm])

  const handleCreateCategory = async (values) => {
    const image = await normalizeImageValue(values.image, dialogState.record?.image || '')
    const carouselImage = await normalizeImageValue(values.carouselImage, dialogState.record?.carouselImage || image)
    const payload = {
      name: values.name,
      description: values.description || '',
      cardTitle: values.cardTitle || values.name,
      cardDescription: values.cardDescription || values.description || '',
      image,
      carouselImage,
      carouselText: values.carouselText || values.description || values.name,
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      await updateCategory({ categoryId: dialogState.record.id, ...payload }).unwrap()
      setFeedback({ message: 'Category updated successfully.', severity: 'success' })
    } else {
      await createCategory(payload).unwrap()
      setFeedback({ message: 'Category created successfully.', severity: 'success' })
    }

    closeDialog()
  }

  const handleCreateSubCategory = async (values) => {
    const image = await normalizeImageValue(values.image, dialogState.record?.image || '')
    const carouselImage = await normalizeImageValue(values.carouselImage, dialogState.record?.carouselImage || image)
    const payload = {
      categoryId: Number(values.categoryId),
      name: values.name,
      description: values.description || '',
      cardTitle: values.cardTitle || values.name,
      cardDescription: values.cardDescription || values.description || '',
      image,
      carouselImage,
      carouselText: values.carouselText || values.description || values.name,
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      await updateSubCategory({ subCategoryId: dialogState.record.id, ...payload }).unwrap()
      setFeedback({ message: 'Subcategory updated successfully.', severity: 'success' })
    } else {
      await createSubCategory(payload).unwrap()
      setFeedback({ message: 'Subcategory created successfully.', severity: 'success' })
    }

    closeDialog()
  }

  const handleCreateProduct = async (values) => {
    productForm.clearErrors(['featureItems', 'benefitItems'])

    if ((values.featureItems || []).some((item) => !itemHasAtLeastOneText(item))) {
      productForm.setError('featureItems', { type: 'manual', message: 'Each key feature must have at least one text. Title is optional.' })
      return
    }

    if ((values.benefitItems || []).some((item) => !itemHasAtLeastOneText(item))) {
      productForm.setError('benefitItems', { type: 'manual', message: 'Each typical benefit must have at least one text. Title is optional.' })
      return
    }

    const image = typeof values.image === 'string'
      ? values.image
      : await normalizeImageValue(values.image, dialogState.record?.image || '')
    const carouselImage = await normalizeImageValue(values.carouselImage, dialogState.record?.carouselImage || image)
    const gallery = values.gallery && typeof values.gallery !== 'string'
      ? await uploadGalleryFiles(values.gallery)
      : dialogState.record?.gallery || []
    const features = normalizeFeatureItems(values.featureItems)
    const benefits = normalizeBenefitItems(values.benefitItems)

    const payload = {
      categoryId: values.categoryId ? Number(values.categoryId) : null,
      subCategoryId: values.subCategoryId ? Number(values.subCategoryId) : null,
      name: values.name,
      description: values.description || '',
      cardTitle: values.cardTitle || values.name,
      cardDescription: values.cardDescription || values.description || '',
      image,
      carouselImage,
      carouselDescription: values.carouselDescription || values.description || values.name,
      gallery,
      features,
      benefits,
    }

    if (dialogState.mode === 'edit' && dialogState.record) {
      await updateProduct({ productId: dialogState.record.id, ...payload }).unwrap()
      setFeedback({ message: 'Product updated successfully.', severity: 'success' })
    } else {
      await createProduct(payload).unwrap()
      setFeedback({ message: 'Product created successfully.', severity: 'success' })
    }

    closeDialog()
  }

  const handleDeleteCategory = (categoryId) => {
    setDeleteConfirm({
      open: true,
      type: 'category',
      id: categoryId,
      message: 'Delete this category?',
    })
  }

  const handleDeleteSubCategory = (subCategoryId) => {
    setDeleteConfirm({
      open: true,
      type: 'subcategory',
      id: subCategoryId,
      message: 'Delete this sub-category?',
    })
  }

  const handleDeleteProduct = (productId) => {
    setDeleteConfirm({
      open: true,
      type: 'product',
      id: productId,
      message: 'Delete this product?',
    })
  }

  const confirmDelete = async () => {
    const { type, id } = deleteConfirm
    try {
      if (type === 'category') {
        await deleteCategory(id).unwrap()
        setFeedback({ message: 'Category deleted successfully.', severity: 'success' })
      } else if (type === 'subcategory') {
        await deleteSubCategory(id).unwrap()
        setFeedback({ message: 'Subcategory deleted successfully.', severity: 'success' })
      } else if (type === 'product') {
        await deleteProduct(id).unwrap()
        setFeedback({ message: 'Product deleted successfully.', severity: 'success' })
      }
    } catch (err) {
      setFeedback({ message: err?.data?.message || `Failed to delete ${type}.`, severity: 'error' })
    } finally {
      setDeleteConfirm({ open: false, type: '', id: null, message: '' })
    }
  }

  const activeTitle = activeTab === 'categories' ? 'Categories' : activeTab === 'subCategories' ? 'Subcategories' : 'Products'
  const activeCreateLabel = activeTab === 'categories' ? 'Create Category' : activeTab === 'subCategories' ? 'Create Subcategory' : 'Create Product'

  const renderDialogBody = () => {
    if (dialogState.section === 'categories') {
      return (
        <FormProvider {...categoryForm}>
          <Stack component="form" onSubmit={categoryForm.handleSubmit(handleCreateCategory)} spacing={2.5}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}><FormTextField helperText="Slug will be created automatically from the category name." label="Category name" name="name" /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormTextField helperText="Shown on category cards. Falls back to the category name." label="Card title" name="cardTitle" /></Grid>
              <Grid size={{ xs: 12 }}><FormTextField label="Description" multiline name="description" rows={4} /></Grid>
              <Grid size={{ xs: 12 }}><FormTextField helperText="Shown on category cards. Falls back to the description." label="Card description" multiline name="cardDescription" rows={3} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormImageUpload label="Category image" name="image" /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormImageUpload label="Carousel image" name="carouselImage" /></Grid>
              <Grid size={{ xs: 12 }}><FormTextField helperText="Shown in the category hero carousel. Falls back to the description." label="Carousel text" multiline name="carouselText" rows={3} /></Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button color="inherit" onClick={closeDialog} variant="outlined">Cancel</Button>
              <Button disabled={isDialogBusy} type="submit" variant="contained">{isDialogBusy ? 'Saving...' : dialogState.mode === 'edit' ? 'Update' : 'Create'}</Button>
            </Stack>
          </Stack>
        </FormProvider>
      )
    }

    if (dialogState.section === 'subCategories') {
      return (
        <FormProvider {...subCategoryForm}>
          <Stack component="form" onSubmit={subCategoryForm.handleSubmit(handleCreateSubCategory)} spacing={2.5}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}><FormSelectField label="Category" name="categoryId" options={categoryOptions} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormTextField helperText="Slug will be created automatically from the subcategory name." label="Subcategory name" name="name" /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormTextField helperText="Shown on subcategory cards. Falls back to the subcategory name." label="Card title" name="cardTitle" /></Grid>
              <Grid size={{ xs: 12 }}><FormTextField label="Description" multiline name="description" rows={4} /></Grid>
              <Grid size={{ xs: 12 }}><FormTextField helperText="Shown on subcategory cards. Falls back to the description." label="Card description" multiline name="cardDescription" rows={3} /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormImageUpload label="Subcategory image" name="image" /></Grid>
              <Grid size={{ xs: 12, md: 6 }}><FormImageUpload label="Carousel image" name="carouselImage" /></Grid>
              <Grid size={{ xs: 12 }}><FormTextField helperText="Shown in the subcategory hero carousel. Falls back to the description." label="Carousel text" multiline name="carouselText" rows={3} /></Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button color="inherit" onClick={closeDialog} variant="outlined">Cancel</Button>
              <Button disabled={isDialogBusy} type="submit" variant="contained">{isDialogBusy ? 'Saving...' : dialogState.mode === 'edit' ? 'Update' : 'Create'}</Button>
            </Stack>
          </Stack>
        </FormProvider>
      )
    }

    return (
      <FormProvider {...productForm}>
        <Stack component="form" onSubmit={productForm.handleSubmit(handleCreateProduct)} spacing={2.5}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}><FormSelectField helperText="Optional for standalone products." label="Category" name="categoryId" options={categoryOptions} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><FormSelectField helperText="Choose a category first to filter this list." label="Subcategory" name="subCategoryId" options={productSubCategoryOptions} /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><FormTextField helperText="Slug will be created automatically from the product name." label="Product name" name="name" /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><FormTextField helperText="Shown on product cards. Falls back to the product name." label="Card title" name="cardTitle" /></Grid>
            <Grid size={{ xs: 12 }}><FormTextField helperText="Shown on product cards." label="Card description" multiline name="cardDescription" rows={3} /></Grid>
            <Grid size={{ xs: 12 }}><FormTextField label="Description" multiline name="description" rows={4} /></Grid>
          </Grid>

          <FormSection description="Upload the product image, hero image, and detail carousel images." title="Media">
            <Stack spacing={2.5}>
              <FormImageUpload label="Product image" name="image" />
              <FormImageUpload label="Carousel image" name="carouselImage" />
              <FormTextField helperText="Shown in the product hero carousel. Falls back to the description." label="Carousel description" multiline name="carouselDescription" rows={3} />
              {dialogState.mode === 'edit' && dialogState.record?.gallery?.length ? (
                <Typography color="text.secondary" variant="body2">Existing detail carousel images: {dialogState.record.gallery.length}. Uploading new images will replace them.</Typography>
              ) : null}
              <FormFileUpload accept="image/*" label="Detail carousel images" multiple name="gallery" />
            </Stack>
          </FormSection>

          <FormSection description="Create as many key features and typical benefits as needed. Use Add text to create multiple bullets under one title." title="Structured details">
            <Stack spacing={2.5}>
              <Box>
                <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={2}>
                  <Typography fontSize="1rem" fontWeight={700}>Key Features</Typography>
                  <Button onClick={() => featureFieldArray.append(emptyDetailItem())} startIcon={<AddIcon />} variant="outlined">Add feature</Button>
                </Stack>
                {productForm.formState.errors.featureItems?.message ? (
                  <Alert severity="error" sx={{ mt: 2 }}>{productForm.formState.errors.featureItems.message}</Alert>
                ) : null}
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {featureFieldArray.fields.map((field, index) => (
                    <ProductDetailItemCard
                      control={productForm.control}
                      index={index}
                      isOnlyItem={featureFieldArray.fields.length === 1}
                      itemName="featureItems"
                      key={field.id}
                      onRemove={featureFieldArray.remove}
                      productForm={productForm}
                      removeLabel="Remove feature"
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={2}>
                  <Typography fontSize="1rem" fontWeight={700}>Typical Benefits</Typography>
                  <Button onClick={() => benefitFieldArray.append(emptyDetailItem())} startIcon={<AddIcon />} variant="outlined">Add benefit</Button>
                </Stack>
                {productForm.formState.errors.benefitItems?.message ? (
                  <Alert severity="error" sx={{ mt: 2 }}>{productForm.formState.errors.benefitItems.message}</Alert>
                ) : null}
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {benefitFieldArray.fields.map((field, index) => (
                    <ProductDetailItemCard
                      control={productForm.control}
                      index={index}
                      isOnlyItem={benefitFieldArray.fields.length === 1}
                      itemName="benefitItems"
                      key={field.id}
                      onRemove={benefitFieldArray.remove}
                      productForm={productForm}
                      removeLabel="Remove benefit"
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </FormSection>

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            <Button color="inherit" onClick={closeDialog} variant="outlined">Cancel</Button>
            <Button disabled={isDialogBusy} type="submit" variant="contained">{isDialogBusy ? 'Saving...' : dialogState.mode === 'edit' ? 'Update' : 'Create'}</Button>
          </Stack>
        </Stack>
      </FormProvider>
    )
  }

  return (
    <Box>
      <PageHeader
        description="Manage the product catalog in an Ethiraj-style admin workflow: section tabs, table views, and modal create or edit forms."
        eyebrow="Catalog"
        title="Product Catalog"
      />

      <SectionTabs onChange={(_event, value) => setActiveTab(value)} value={activeTab} />

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', p: 3.5 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2.5} sx={{ mb: 3 }}>
          <Box>
            <Typography color="text.primary" fontSize="2rem" fontWeight={700} sx={{ mb: 0.5 }}>{activeTitle}</Typography>
            <Typography color="text.secondary">Manage {activeTitle.toLowerCase()} with the same table-first workflow used in the Ethiraj content admin screens.</Typography>
          </Box>
          <Button
            onClick={() => openDialog(activeTab, 'create')}
            startIcon={<AddIcon />}
            sx={{ alignSelf: { xs: 'stretch', md: 'center' }, fontSize: '1rem', fontWeight: 700, px: 2.25 }}
            variant="contained"
          >
            Create
          </Button>
        </Stack>

        {feedback ? <Alert onClose={() => setFeedback(null)} severity={feedback.severity} sx={{ mb: 3 }}>{feedback.message}</Alert> : null}
        {catalogQuery.isError ? <Alert severity="error" sx={{ mb: 3 }}>{catalogQuery.error?.data?.message || 'Unable to load the catalog.'}</Alert> : null}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' }, mb: 2.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary">Show</Typography>
            <TextField
              onChange={(event) => setRowsPerPage(Number(event.target.value))}
              select
              size="small"
              sx={{ minWidth: 88 }}
              value={rowsPerPage}
            >
              {[5, 10, 25].map((count) => <MenuItem key={count} value={count}>{count}</MenuItem>)}
            </TextField>
            <Typography color="text.secondary">items</Typography>
          </Stack>
        </Stack>

        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { backgroundColor: 'primary.main', borderBottom: 'none', color: '#fff', fontSize: '1rem', fontWeight: 700, py: 2.25 } }}>
                <TableCell sx={{ width: 90 }}>S.No</TableCell>
                <TableCell>{activeTab === 'categories' ? 'Category' : activeTab === 'subCategories' ? 'Subcategory' : 'Product'}</TableCell>
                {activeTab !== 'categories' ? <TableCell>{activeTab === 'subCategories' ? 'Category' : 'Hierarchy'}</TableCell> : null}
                <TableCell align="center" sx={{ width: 160 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeTab === 'categories' ? visibleRows.map((category, index) => (
                <TableRow key={category.id} sx={{ '& td': { borderBottomColor: '#E2E8F0', py: 2.5 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography fontSize="1.05rem">{category.name}</Typography>
                    <Typography color="text.secondary" variant="body2">{category.cardTitle || category.description || category.slug}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <ActionButton color="inherit" disabled={isDialogBusy} label={`Edit ${category.name}`} onClick={() => openDialog('categories', 'edit', category)}>
                      <EditOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton color="error" disabled={deleteCategoryState.isLoading} label={`Delete ${category.name}`} onClick={() => handleDeleteCategory(category.id)}>
                      <DeleteIcon fontSize="small" />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              )) : activeTab === 'subCategories' ? visibleRows.map((subCategory, index) => (
                <TableRow key={subCategory.id} sx={{ '& td': { borderBottomColor: '#E2E8F0', py: 2.5 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography fontSize="1.05rem">{subCategory.name}</Typography>
                    <Typography color="text.secondary" variant="body2">{subCategory.cardTitle || subCategory.description || subCategory.slug}</Typography>
                  </TableCell>
                  <TableCell>{categories.find((category) => category.id === subCategory.categoryId)?.name || 'No category'}</TableCell>
                  <TableCell align="center">
                    <ActionButton color="inherit" disabled={isDialogBusy} label={`Edit ${subCategory.name}`} onClick={() => openDialog('subCategories', 'edit', subCategory)}>
                      <EditOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton color="error" disabled={deleteSubCategoryState.isLoading} label={`Delete ${subCategory.name}`} onClick={() => handleDeleteSubCategory(subCategory.id)}>
                      <DeleteIcon fontSize="small" />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              )) : visibleRows.map((product, index) => (
                <TableRow key={product.id} sx={{ '& td': { borderBottomColor: '#E2E8F0', py: 2.5 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography fontSize="1.05rem">{product.name}</Typography>
                    <Typography color="text.secondary" variant="body2">{product.cardTitle || product.cardDescription || product.slug}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{categories.find((category) => category.id === product.categoryId)?.name || 'Standalone'}</Typography>
                    <Typography color="text.secondary" variant="body2">{subCategories.find((subCategory) => subCategory.id === product.subCategoryId)?.name || 'No subcategory'}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <ActionButton color="inherit" disabled={isDialogBusy} label={`Edit ${product.name}`} onClick={() => openDialog('products', 'edit', product)}>
                      <EditOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton color="error" disabled={deleteProductState.isLoading} label={`Delete ${product.name}`} onClick={() => handleDeleteProduct(product.id)}>
                      <DeleteIcon fontSize="small" />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
              {visibleRows.length === 0 ? <EmptyRows colSpan={activeTab === 'categories' ? 3 : 4} message={`No ${activeTitle.toLowerCase()} found.`} /> : null}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <CatalogDialogFrame
        onClose={closeDialog}
        open={dialogState.open}
        title={`${dialogState.mode === 'edit' ? 'Edit' : 'Create'} ${dialogState.section === 'categories' ? 'Category' : dialogState.section === 'subCategories' ? 'Subcategory' : 'Product'}`}
      >
        {renderDialogBody()}
      </CatalogDialogFrame>

      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, type: '', id: null, message: '' })}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1.5,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography fontSize="1.1rem" sx={{ mb: 3 }}>
            {deleteConfirm.message}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              color="inherit"
              onClick={() => setDeleteConfirm({ open: false, type: '', id: null, message: '' })}
              variant="outlined"
            >
              No
            </Button>
            <Button
              color="error"
              onClick={confirmDelete}
              variant="contained"
              disabled={deleteCategoryState.isLoading || deleteSubCategoryState.isLoading || deleteProductState.isLoading}
            >
              Yes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}