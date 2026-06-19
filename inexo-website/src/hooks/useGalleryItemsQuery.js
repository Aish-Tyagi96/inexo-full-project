import { useQuery } from '@tanstack/react-query'
import { fetchGalleryItems } from '@/services/newsEventsApi'

export function useGalleryItemsQuery() {
  return useQuery({
    queryKey: ['gallery-items'],
    queryFn: async ({ signal }) => fetchGalleryItems({ signal }),
  })
}
