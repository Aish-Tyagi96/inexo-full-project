import { env } from '@/app/env'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('inexo_admin_token')
  const baseUrl = options.baseUrl ?? env.apiBaseUrl
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.replace(/^\//, '')
  const headers = {
    Accept: 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${normalizedBaseUrl}/${normalizedPath}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body instanceof FormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    throw new Error(typeof payload === 'string' ? payload : payload?.message || 'Request failed')
  }

  return payload
}
