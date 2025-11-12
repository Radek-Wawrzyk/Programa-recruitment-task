import { ref } from 'vue'

const useVehivles = () => {
  const vehicles = ref<Vehicle[]>([])

  const getVehicles = async () => {
    const response = await fetch('/api/vehicles')
    const data = await response.json()
    vehicles.value = data
  }

  const getVehicles = () => {}

  return {
    vehicles,
  }
}

export { useVehivles }
