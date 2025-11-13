<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Vehicle } from '@/types/Vehicle'
import { useI18n } from 'vue-i18n'

import VehicleCard from '@/components/Vehicle/VehicleCard/VehicleCard.vue'
import VehicleDetailsModal from '@/components/Vehicle/VehicleDetailsModal/VehicleDetailsModal.vue'

const props = defineProps<{
  vehicles: Vehicle[]
  isLoading: boolean
}>()

const { t } = useI18n()

const isModalOpen = ref(false)
const selectedVehicle = ref<Vehicle | null>(null)

const fallbackText = computed(() => {
  return props.isLoading ? t('common.loading') : t('vehicle.empty')
})

const handleCheckDetails = (vehicle: Vehicle) => {
  selectedVehicle.value = vehicle
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  selectedVehicle.value = null
}
</script>

<template>
  <div class="vehicle-list">
    <TransitionGroup
      name="vehicle-list"
      class="vehicle-list__grid"
      tag="div"
      v-if="!isLoading && vehicles.length > 0"
    >
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
        @check-details="handleCheckDetails"
      />
    </TransitionGroup>

    <p class="vehicle-list__empty" v-else>{{ fallbackText }}</p>
  </div>

  <VehicleDetailsModal
    v-model="isModalOpen"
    :vehicle="selectedVehicle"
    @close="handleCloseModal"
    show-footer
  />
</template>

<style scoped lang="scss" src="./VehicleList.scss" />
