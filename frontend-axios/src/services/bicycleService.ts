import axios from 'axios'

export interface Bicycle {
  id: number
  brand: string
  model: string
  description: string | null
  price: number | string
  stock: number
  createdAt?: string
  updatedAt?: string
}

export interface BicyclePayload {
  brand: string
  model: string
  description: string | null
  price: number
  stock: number
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const bicycleService = {
  async getAll() {
    const response = await api.get<Bicycle[]>('/bicycles')
    return response.data
  },

  async getById(id: number) {
    const response = await api.get<Bicycle>(`/bicycles/${id}`)
    return response.data
  },

  async create(payload: BicyclePayload) {
    const response = await api.post<Bicycle>('/bicycles', payload)
    return response.data
  },

  async update(id: number, payload: BicyclePayload) {
    const response = await api.put<Bicycle>(`/bicycles/${id}`, payload)
    return response.data
  },

  async remove(id: number) {
    await api.delete(`/bicycles/${id}`)
  },
}

export default api
