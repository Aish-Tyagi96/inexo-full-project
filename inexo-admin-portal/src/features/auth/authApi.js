import { apiSlice } from '@/api/apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => '/auth/me',
      providesTags: ['AuthUser'],
    }),
    getAuthUsers: builder.query({
      query: () => '/auth/users',
      providesTags: ['AuthUser'],
    }),
    createAuthUser: builder.mutation({
      query: (payload) => ({
        url: '/auth/users',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['AuthUser'],
    }),
    getRoles: builder.query({
      query: () => '/auth/roles',
      providesTags: ['Role'],
    }),
    createRole: builder.mutation({
      query: (payload) => ({
        url: '/auth/roles',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Role'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetAuthUsersQuery,
  useCreateAuthUserMutation,
  useGetRolesQuery,
  useCreateRoleMutation,
} = authApi
