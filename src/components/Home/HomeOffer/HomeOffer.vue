<script setup lang="ts">
import { onMounted } from 'vue'
import { useVehivles } from '@/composables/useVehicles'
import type { VehicleFilters as VehicleFiltersType } from '@/types/Vehicle'

import VehicleFilters from '@/components/Vehicle/VehicleFilters/VehicleFilters.vue'
import VehicleList from '@/components/Vehicle/VehicleList/VehicleList.vue'

const { fetchVehicles, filteredVehicles, setFilters, filters, isLoading } = useVehivles()

const handleFilter = (newFilters: VehicleFiltersType) => {
  setFilters(newFilters)
}

onMounted(async () => {
  await fetchVehicles()
})
</script>

<template>
  <section class="home-offer">
    <div class="container">
      <h2 class="home-offer__title">{{ $t('home.offers.title') }}</h2>
      <VehicleFilters :filters="filters" @filter="handleFilter" />
      <VehicleList :vehicles="filteredVehicles" :isLoading="isLoading" />
    </div>
  </section>
</template>

<style lang="scss" scoped src="./HomeOffer.scss" />
