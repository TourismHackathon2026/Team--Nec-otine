import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

// Automatically attach Firebase token to every request
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const registerUser = (data) => api.post('/auth/register', data)
export const getCurrentUser = () => api.get('/auth/me')

// Guides
export const getAllGuides = () => api.get('/guides')
export const getGuideById = (id) => api.get(`/guides/${id}`)
export const updateGuideProfile = (data) => api.put('/guides/profile', data)

// Bookings
export const createBooking = (data) => api.post('/bookings', data)
export const getMyBookings = () => api.get('/bookings/mine')
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}`, { status })