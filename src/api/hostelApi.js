import axios from 'axios'

const BASE_URL = '/hostels'

export const hostelApi = {
  createHostel: async (hostelData) => {
    try {
      const response = await axios.post(`${BASE_URL}/userhostel`, hostelData)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create hostel' }
    }
  },

  getAllHostels: async (ownerId) => {
    try {
      const response = await axios.get(`${BASE_URL}/allHostels/${ownerId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch hostels' }
    }
  }
}