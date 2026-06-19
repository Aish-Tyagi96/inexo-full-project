export async function apiRequest(path, options = {}) {
  const {
    baseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
    method = 'GET',
    body,
    headers,
    signal,
  } = options

  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.replace(/^\//, '')
  const requestHeaders = {
    ...headers,
  }

  if (body) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${normalizedBaseUrl}/${normalizedPath}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload?.message
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  return payload
}
