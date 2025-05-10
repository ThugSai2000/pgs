import axios from 'axios'

const BASE_URL = '/rooms'

export const roomApi = {
  addRoom: async (roomData) => {
    try {
      const response = await axios.post(`${BASE_URL}/addroom`, roomData)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create room' }
    }
  },

  getAllRooms: async (hostelId) => {
    try {
      const response = await axios.get(`${BASE_URL}/allrooms/${hostelId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch rooms' }
    }
  }
}