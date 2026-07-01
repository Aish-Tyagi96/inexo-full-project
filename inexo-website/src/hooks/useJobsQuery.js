import { useQuery } from '@tanstack/react-query'
import { fetchJobs } from '@/services/jobsApi'

export function useJobsQuery() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async ({ signal }) => fetchJobs({ signal }),
  })
}
