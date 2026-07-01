import { apiSlice } from '@/api/apiSlice'

export const jobOpeningsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => '/jobs',
      providesTags: ['JobOpenings'],
    }),
    createJob: builder.mutation({
      query: (payload) => ({
        url: '/jobs',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['JobOpenings'],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/jobs/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['JobOpenings'],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['JobOpenings'],
    }),
  }),
})

export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobOpeningsApi
