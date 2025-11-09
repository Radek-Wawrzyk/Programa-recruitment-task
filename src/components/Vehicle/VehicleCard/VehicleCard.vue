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
      <p class="vehicle-card__price">{{ $t('cars.from') }} {{ formatPrice(priceFrom) }} zł</p>
      <p class="vehicle-card__specs">
        {{ drive }} • {{ range }}{{ $t('cars.km') }} {{ $t('cars.range') }}
      </p>
      <BaseButton variant="primary" class="vehicle-card__button"> Sprawdź </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./VehicleCard.scss" />
