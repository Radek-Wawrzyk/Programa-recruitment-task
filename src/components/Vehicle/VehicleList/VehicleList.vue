<script setup lang="ts">
import VehicleCard from '@/components/Vehicle/VehicleCard/VehicleCard.vue'
import type { Vehicle } from '@/types/Vehicle'

defineProps<{
  vehicles: Vehicle[]
}>()
</script>

<template>
  <div class="vehicle-list">
    <VehicleCard
      v-for="vehicle in vehicles"
      :key="vehicle.id"
      :id="vehicle.id"
      :vehicle="vehicle"
    />
  </div>
</template>

<style scoped lang="scss" src="./VehicleList.scss" />
