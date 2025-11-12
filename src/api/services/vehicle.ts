import type { Vehicle } from '@/types/Vehicle'
import { client } from '../client'

const vehicleService = {
  getAllVehicles: async () => {
    const response = await client.get<Vehicle[]>('/vehicles')
    return response.data
  },
}

export { vehicleService }
