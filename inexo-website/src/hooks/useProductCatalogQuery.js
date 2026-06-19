import { useQuery } from '@tanstack/react-query'
import { createCatalogModel } from '@/data/productCatalog'
import { fetchCatalogTree } from '@/services/catalogApi'

export function useProductCatalogQuery() {
  return useQuery({
    queryKey: ['catalog-tree'],
    queryFn: async ({ signal }) => createCatalogModel(await fetchCatalogTree({ signal })),
  })
}