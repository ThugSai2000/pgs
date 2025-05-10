import axios from 'axios'

const BASE_URL = '/users'

export const userApi = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  getUser: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' }
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' }
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${userId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' }
    }
  }
}