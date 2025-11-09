<script setup lang="ts">
import { ref, computed } from 'vue'
import VehicleFilters from '@/components/Vehicle/VehicleFilters/VehicleFilters.vue'
import VehicleList from '@/components/Vehicle/VehicleList/VehicleList.vue'

interface Car {
  id: number
  model: string
  type: string
  drive: string
  driveType: string
  priceFrom: number
  range: number
  images?: Array<{ type: string; url: string }>
}

interface Filters {
  type: string
  driveType: string
  priceMin: string
  priceMax: string
}

// Mockowane dane - w przyszłości będą z API
const mockCars: Car[] = [
  {
    id: 1,
    model: 'Voltura ZX 2025',
    type: 'SUV',
    drive: 'AWD',
    driveType: 'Electric',
    priceFrom: 100999,
    range: 400,
    images: [
      {
        type: 'main',
        url: '/images/voltura-zx-main.jpg',
      },
    ],
  },
  {
    id: 2,
    model: 'Voltura PX 2025',
    type: 'SUV',
    drive: 'AWD',
    driveType: 'Electric',
    priceFrom: 120999,
    range: 500,
    images: [
      {
        type: 'main',
        url: '/images/voltura-px-main.jpg',
      },
    ],
  },
  {
    id: 3,
    model: 'Voltura SX 2025',
    type: 'SUV',
    drive: 'AWD',
    driveType: 'Electric',
    priceFrom: 99999,
    range: 300,
    images: [
      {
        type: 'main',
        url: '/images/voltura-sx-main.jpg',
      },
    ],
  },
]

const filters = ref<Filters>({
  type: 'SUV',
  driveType: 'Elektryczny',
  priceMin: '100 000',
  priceMax: '200 000',
})

const filteredCars = computed(() => {
  let result = [...mockCars]

  // Filtrowanie po typie
  if (filters.value.type) {
    result = result.filter((car) => car.type === filters.value.type)
  }

  // Filtrowanie po napędzie (driveType)
  if (filters.value.driveType) {
    const driveTypeMap: Record<string, string> = {
      Elektryczny: 'Electric',
      Hybrydowy: 'Hybrid',
      Benzyna: 'Petrol',
      Diesel: 'Diesel',
    }
    const mappedDriveType = driveTypeMap[filters.value.driveType] || filters.value.driveType
    result = result.filter((car) => car.driveType === mappedDriveType)
  }

  // Filtrowanie po cenie
  const priceMin = parseInt(filters.value.priceMin.replace(/\s/g, '')) || 0
  const priceMax = parseInt(filters.value.priceMax.replace(/\s/g, '')) || Infinity

  result = result.filter((car) => car.priceFrom >= priceMin && car.priceFrom <= priceMax)

  return result
})

const handleFilter = (newFilters: Filters) => {
  filters.value = newFilters
}
</script>

<template>
  <section class="home-offer">
    <div class="container">
      <h2 class="home-offer__title">{{ $t('home.offers.title') }}</h2>
      <VehicleFilters @filter="handleFilter" />
      <VehicleList :cars="filteredCars" />
    </div>
  </section>
</template>

<style lang="scss" scoped src="./HomeOffer.scss" />
