import axios from 'axios'

const BASE_URL = '/owner'

export const ownerApi = {
  register: async (ownerData) => {
    try {
      const response = await axios.post(`${BASE_URL}/userowner`, ownerData)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' }
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/ownerlogin`, credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' }
    }
  }
}