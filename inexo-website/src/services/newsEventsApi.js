import { env } from '@/app/env'

export async function fetchNewsEvents({ signal } = {}) {
  const response = await fetch(`${env.apiBaseUrl.replace(/\/$/, '')}/news-events`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to load news and events.')
  }

  return payload.data
}

export async function fetchGalleryItems({ signal } = {}) {
  const response = await fetch(`${env.apiBaseUrl.replace(/\/$/, '')}/gallery-items`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to load gallery items.')
  }

  return payload.data
}
