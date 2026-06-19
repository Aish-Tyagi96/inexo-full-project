import { apiSlice } from '@/api/apiSlice'

export const catalogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogTree: builder.query({
      query: () => '/catalog/admin/tree',
      providesTags: ['Catalog'],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: '/catalog/categories',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Catalog'],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, ...payload }) => ({
        url: `/catalog/categories/${categoryId}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Catalog'],
    }),
    createSubCategory: builder.mutation({
      query: (payload) => ({
        url: '/catalog/sub-categories',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Catalog'],
    }),
    updateSubCategory: builder.mutation({
      query: ({ subCategoryId, ...payload }) => ({
        url: `/catalog/sub-categories/${subCategoryId}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Catalog'],
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: '/catalog/products',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Catalog'],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...payload }) => ({
        url: `/catalog/products/${productId}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Catalog'],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/catalog/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Catalog'],
    }),
    deleteSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/catalog/sub-categories/${subCategoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Catalog'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/catalog/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Catalog'],
    }),
  }),
})

export const {
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
} = catalogApi