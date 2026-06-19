import { apiSlice } from '@/api/apiSlice'

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryItems: builder.query({
      query: () => '/gallery-items',
      providesTags: ['Gallery'],
    }),
    createGalleryItem: builder.mutation({
      query: (payload) => ({
        url: '/gallery-items',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Gallery'],
    }),
    updateGalleryItem: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/gallery-items/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Gallery'],
    }),
    deleteGalleryItem: builder.mutation({
      query: (id) => ({
        url: `/gallery-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),
  }),
})

export const {
  useGetGalleryItemsQuery,
  useCreateGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} = galleryApi
