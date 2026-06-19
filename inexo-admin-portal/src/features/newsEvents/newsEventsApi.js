import { apiSlice } from '@/api/apiSlice'

export const newsEventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewsEvents: builder.query({
      query: () => '/news-events',
      providesTags: ['NewsEvents'],
    }),
    createNewsEvent: builder.mutation({
      query: (payload) => ({
        url: '/news-events',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['NewsEvents'],
    }),
    updateNewsEvent: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/news-events/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['NewsEvents'],
    }),
    deleteNewsEvent: builder.mutation({
      query: (id) => ({
        url: `/news-events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['NewsEvents'],
    }),
  }),
})

export const {
  useGetNewsEventsQuery,
  useCreateNewsEventMutation,
  useUpdateNewsEventMutation,
  useDeleteNewsEventMutation,
} = newsEventsApi
