<script setup lang="ts">
import VehicleCard from '@/components/Vehicle/VehicleCard/VehicleCard.vue'

interface Car {
  id: number
  model: string
  priceFrom: number
  drive: string
  range: number
  images?: Array<{ type: string; url: string }>
}

defineProps<{
  cars: Car[]
}>()
</script>

<template>
  <div class="vehicle-list">
    <VehicleCard
      v-for="car in cars"
      :key="car.id"
      :id="car.id"
      :model="car.model"
      :price-from="car.priceFrom"
      :drive="car.drive"
      :range="car.range"
      :image-url="car.images?.find((img) => img.type === 'main')?.url"
    />
  </div>
</template>

<style scoped lang="scss" src="./VehicleList.scss" />
