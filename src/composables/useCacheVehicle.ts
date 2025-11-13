import type { CachedVehicle, VehicleOffer } from '@/types/Vehicle';
import { STORAGE_KEYS } from '@/constants/StorageKeys';

const useCacheVehicle = () => {
  const getAllVehiclesFromCache = (): CachedVehicle[] => {
    const vehicles = localStorage.getItem(STORAGE_KEYS.VEHICLE_OFFER_DETAILS);
    return vehicles ? JSON.parse(vehicles) : [];
  };

  const getVehicleFromCache = (vehicleId: number): VehicleOffer | null => {
    const vehicles = getAllVehiclesFromCache();
    const targetVehicle = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
    return targetVehicle ? targetVehicle.offer : null;
  };

  const saveVehicle = (vehicleId: number, offer: VehicleOffer) => {
    const vehicles = getAllVehiclesFromCache();
    const existingIndex = vehicles.findIndex((vehicle) => vehicle.vehicleId === vehicleId);

    if (existingIndex !== -1) vehicles[existingIndex] = { vehicleId, offer };
    else vehicles.push({ vehicleId, offer });

    localStorage.setItem(STORAGE_KEYS.VEHICLE_OFFER_DETAILS, JSON.stringify(vehicles));
  };

  return {
    getVehicleFromCache,
    saveVehicle,
  };
};

export { useCacheVehicle };
