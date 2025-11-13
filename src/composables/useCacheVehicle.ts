import type { CachedVehicle, VehicleOffer } from '@/types/Vehicle'
import { STORAGE_KEYS } from '@/constants/StorageKeys'

const useCacheVehicle = () => {
  const getVehiclesFromCache = (): CachedVehicle[] => {
    const vehicles = localStorage.getItem(STORAGE_KEYS.VEHICLE_OFFER_DETAILS)
    return vehicles ? JSON.parse(vehicles) : []
  }

  const saveVehicle = (vehicleId: number, offer: VehicleOffer) => {
    const vehicles = getVehiclesFromCache()
    const existingIndex = vehicles.findIndex((v) => v.vehicleId === vehicleId)

    if (existingIndex !== -1) vehicles[existingIndex] = { vehicleId, offer }
    else vehicles.push({ vehicleId, offer })

    localStorage.setItem(STORAGE_KEYS.VEHICLE_OFFER_DETAILS, JSON.stringify(vehicles))
  }

  return {
    saveVehicle,
  }
}

export { useCacheVehicle }
