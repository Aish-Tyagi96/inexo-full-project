import { useQuery } from '@tanstack/react-query'
import { fetchNewsEvents } from '@/services/newsEventsApi'

export function useNewsEventsQuery() {
  return useQuery({
    queryKey: ['news-events'],
    queryFn: async ({ signal }) => fetchNewsEvents({ signal }),
  })
}
