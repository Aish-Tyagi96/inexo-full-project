import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/app/env'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('inexo_admin_token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['AuthUser', 'Role', 'Dashboard', 'Catalog', 'NewsEvents', 'Gallery', 'JobOpenings'],
  endpoints: () => ({}),
})
