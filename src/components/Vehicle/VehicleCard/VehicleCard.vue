<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'

import type { Vehicle } from '@/types/Vehicle'
import { computed } from 'vue'
import { usePrice } from '@/composables/usePrice'

const props = defineProps<{
  vehicle: Vehicle
}>()

const emit = defineEmits<{
  'check-details': [vehicle: Vehicle]
}>()

const { formatPrice } = usePrice()

const mainImage = computed(() => {
  return props.vehicle.images.find((image) => image.type === 'main')?.url
})

const handleCheckClick = () => {
  emit('check-details', props.vehicle)
}
</script>

<template>
  <div class="vehicle-card">
    <div class="vehicle-card__image-wrapper">
      <img :src="mainImage" :alt="vehicle.model" class="vehicle-card__image" />
    </div>

    <div class="vehicle-card__content">
      <h3 class="vehicle-card__model">{{ vehicle.model }}</h3>
      <p class="vehicle-card__price">
        {{ $t('vehicle.from') }} {{ formatPrice(vehicle.priceFrom) }}
      </p>

      <div class="vehicle-card__specs-wrapper">
        <p class="vehicle-card__specs">
          {{ vehicle.driveType }} • {{ vehicle.range }} km {{ $t('vehicle.range') }}
        </p>

        <BaseButton variant="primary" size="sm" @click="handleCheckClick">
          {{ $t('vehicle.check') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./VehicleCard.scss" />
