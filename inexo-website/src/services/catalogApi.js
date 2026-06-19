import { env } from '@/app/env'

export async function fetchCatalogTree({ signal } = {}) {
  const response = await fetch(`${env.apiBaseUrl.replace(/\/$/, '')}/catalog/tree`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to load catalog.')
  }

  return payload.data
}