import { env } from '@/app/env'

export async function fetchJobs({ signal } = {}) {
  const response = await fetch(`${env.apiBaseUrl.replace(/\/$/, '')}/jobs`, {
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || 'Unable to load job openings.')
  }

  return payload.data
}
