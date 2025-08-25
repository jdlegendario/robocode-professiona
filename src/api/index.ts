// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Helper function to make authenticated requests
const authenticatedFetch = async (url: string, options: RequestInit = {}, token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return authenticatedFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  },

  verifyToken: async (token: string) => {
    return authenticatedFetch('/api/auth/verify', {
      method: 'POST'
    }, token)
  },

  changePassword: async (currentPassword: string, newPassword: string, token: string) => {
    return authenticatedFetch('/api/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    }, token)
  }
}

// Team API
export const teamAPI = {
  getAll: async () => {
    return authenticatedFetch('/api/team')
  },

  getAllAdmin: async (token: string) => {
    return authenticatedFetch('/api/team/admin/all', {}, token)
  },

  create: async (data: FormData, token: string) => {
    return fetch(`${API_BASE_URL}/api/team`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }).then(res => res.json())
  },

  update: async (id: string, data: FormData, token: string) => {
    return fetch(`${API_BASE_URL}/api/team/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }).then(res => res.json())
  },

  delete: async (id: string, token: string) => {
    return authenticatedFetch(`/api/team/${id}`, {
      method: 'DELETE'
    }, token)
  }
}

// Projects API
export const projectsAPI = {
  getAll: async () => {
    return authenticatedFetch('/api/projects')
  },

  getAllAdmin: async (token: string) => {
    return authenticatedFetch('/api/projects/admin/all', {}, token)
  },

  getCategories: async () => {
    return authenticatedFetch('/api/projects/categories')
  },

  create: async (data: FormData, token: string) => {
    return fetch(`${API_BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }).then(res => res.json())
  },

  update: async (id: string, data: FormData, token: string) => {
    return fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }).then(res => res.json())
  },

  delete: async (id: string, token: string) => {
    return authenticatedFetch(`/api/projects/${id}`, {
      method: 'DELETE'
    }, token)
  }
}

// Blog API
export const blogAPI = {
  getAll: async (params?: URLSearchParams) => {
    const queryString = params ? `?${params.toString()}` : ''
    return authenticatedFetch(`/api/blog${queryString}`)
  },

  getAllAdmin: async (token: string) => {
    return authenticatedFetch('/api/blog/admin/all', {}, token)
  },

  getStats: async (token: string) => {
    return authenticatedFetch('/api/blog/admin/stats', {}, token)
  },

  create: async (data: FormData, token: string) => {
    return fetch(`${API_BASE_URL}/api/blog`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }).then(res => res.json())
  },

  update: async (id: string, data: FormData, token: string) => {
    return fetch(`${API_BASE_URL}/api/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    }).then(res => res.json())
  },

  delete: async (id: string, token: string) => {
    return authenticatedFetch(`/api/blog/${id}`, {
      method: 'DELETE'
    }, token)
  }
}

// Contact API
export const contactAPI = {
  send: async (data: {
    name: string
    email: string
    subject?: string
    message: string
    phone?: string
    company?: string
  }) => {
    return authenticatedFetch('/api/contact/send', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  getMessages: async (token: string, params?: URLSearchParams) => {
    const queryString = params ? `?${params.toString()}` : ''
    return authenticatedFetch(`/api/contact/messages${queryString}`, {}, token)
  },

  getStats: async (token: string) => {
    return authenticatedFetch('/api/contact/stats', {}, token)
  },

  markAsRead: async (id: string, token: string) => {
    return authenticatedFetch(`/api/contact/messages/${id}/read`, {
      method: 'PUT'
    }, token)
  },

  delete: async (id: string, token: string) => {
    return authenticatedFetch(`/api/contact/messages/${id}`, {
      method: 'DELETE'
    }, token)
  }
}