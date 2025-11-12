<script setup lang="ts">
import { onMounted } from 'vue'
import { useVehivles } from '@/composables/useVehivles'
import type { VehicleFilters as VehicleFiltersType } from '@/types/Vehicle'

import VehicleFilters from '@/components/Vehicle/VehicleFilters/VehicleFilters.vue'
import VehicleList from '@/components/Vehicle/VehicleList/VehicleList.vue'

const { fetchVehicles, filteredVehicles, setFilters, filters } = useVehivles()

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
      <VehicleList :vehicles="filteredVehicles" />
    </div>
  </section>
</template>

<style lang="scss" scoped src="./HomeOffer.scss" />
