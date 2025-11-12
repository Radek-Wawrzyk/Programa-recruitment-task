<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'

interface Props {
  id: number
  model: string
  priceFrom: number
  drive: string
  range: number
  imageUrl?: string
}

defineProps<Props>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pl-PL').format(price)
}
</script>

<template>
  <div class="vehicle-card">
    <div class="vehicle-card__image-wrapper">
      <img
        :src="imageUrl || '/images/placeholder-car.jpg'"
        :alt="model"
        class="vehicle-card__image"
      />
    </div>

    <div class="vehicle-card__content">
      <h3 class="vehicle-card__model">{{ model }}</h3>
      <p class="vehicle-card__price">{{ $t('vehicle.from') }} {{ formatPrice(priceFrom) }} zł</p>

      <div class="vehicle-card__specs-wrapper">
        <p class="vehicle-card__specs">{{ drive }} • {{ range }} km {{ $t('vehicle.range') }}</p>

        <BaseButton variant="primary" size="sm">
          {{ $t('vehicle.check') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./VehicleCard.scss" />
