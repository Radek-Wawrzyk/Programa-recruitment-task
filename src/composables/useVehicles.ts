import { ref, computed } from 'vue';
import type { Vehicle, VehicleFilters } from '@/types/Vehicle';
import { vehicleService } from '@/api/services/vehicle';

const vehicles = ref<Vehicle[]>([]);
const isLoading = ref(false);
const filters = ref<VehicleFilters>({
  type: undefined,
  driveType: undefined,
  priceMin: 0,
  priceMax: 1000000,
});

const useVehivles = () => {
  const fetchVehicles = async () => {
    isLoading.value = true;

    try {
      const response = await vehicleService.getAllVehicles();
      vehicles.value = response;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const getVehicleById = (id: number) => {
    return vehicles.value.find((vehicle) => vehicle.id === id);
  };

  const setFilters = (newFilters: VehicleFilters) => {
    filters.value = { ...newFilters };
  };

  const filteredVehicles = computed(() => {
    return vehicles.value.filter((vehicle) => {
      if (filters.value.type && vehicle.type !== filters.value.type) {
        return false;
      }

      if (filters.value.driveType && vehicle.drive !== filters.value.driveType) {
        return false;
      }

      if (vehicle.priceFrom < filters.value.priceMin) {
        return false;
      }

      if (vehicle.priceFrom > filters.value.priceMax) {
        return false;
      }

      return true;
    });
  });

  return {
    vehicles,
    filteredVehicles,
    isLoading,
    filters,
    fetchVehicles,
    getVehicleById,
    setFilters,
  };
};

export { useVehivles };
