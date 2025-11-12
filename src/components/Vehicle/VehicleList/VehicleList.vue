<script setup lang="ts">
import VehicleCard from '@/components/Vehicle/VehicleCard/VehicleCard.vue'
import type { Vehicle } from '@/types/Vehicle'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  vehicles: Vehicle[]
  isLoading: boolean
}>()

const { t } = useI18n()

const emptyText = computed(() => {
  return props.isLoading ? t('common.loading') : t('vehicle.empty')
})
</script>

<template>
  <div class="vehicle-list">
    <div class="vehicle-list__grid" v-if="!isLoading && vehicles.length > 0">
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :id="vehicle.id"
        :vehicle="vehicle"
      />
    </div>

    <p class="vehicle-list__empty" v-else>{{ emptyText }}</p>
  </div>
</template>

<style scoped lang="scss" src="./VehicleList.scss" />
