const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(endpoint, method = 'GET', body = null, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(err.detail || 'Request failed')
  }

  return res.json()
}

export const api = {
  match: (query, token, topK = 8) =>
    request('/match', 'POST', { query, top_k: topK }, token),

  getAgents: (token) =>
    request('/agents', 'GET', null, token),

  getAgent: (id, token) =>
    request(`/agents/${id}`, 'GET', null, token),

  getLogs: (token) =>
    request('/logs', 'GET', null, token),

  getMe: (token) =>
    request('/me', 'GET', null, token),
}
