import { ref } from 'vue'
import type { Vehicle } from '@/types/Vehicle'
import { vehicleService } from '@/api/services/vehicle'

const vehicles = ref<Vehicle[]>([])
const isLoading = ref(false)

const useVehivles = () => {
  const fetchVehicles = async () => {
    isLoading.value = true

    try {
      const response = await vehicleService.getAllVehicles()
      vehicles.value = response
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const getVehicleById = (id: number) => {
    return vehicles.value.find((vehicle) => vehicle.id === id)
  }

  const getFilteredVehicles = () => {
    return vehicles.value
  }

  return {
    vehicles,
    isLoading,
    fetchVehicles,
    getVehicleById,
    getFilteredVehicles,
  }
}

export { useVehivles }
