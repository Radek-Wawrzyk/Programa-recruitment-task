<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VehicleFilters } from '@/types/Vehicle'
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'
import BaseCard from '@/components/Base/BaseCard/BaseCard.vue'
import BaseInput from '@/components/Base/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect/BaseSelect.vue'

const emit = defineEmits<{
  filter: [filters: VehicleFilters]
}>()

const { t } = useI18n()

const filters = ref<VehicleFilters>({
  type: 'suv',
  driveType: 'electric',
  priceMin: 0,
  priceMax: 100,
})

const vehicleTypes = computed(() => {
  return [
    { value: 'suv', label: t('vehicle.filters.suv') },
    { value: 'sedan', label: t('vehicle.filters.sedan') },
  ]
})

const vehicleDrives = computed(() => {
  return [
    { value: 'electric', label: t('vehicle.filters.electric') },
    { value: 'hybrid', label: t('vehicle.filters.hybrid') },
    { value: 'petrol', label: t('vehicle.filters.petrol') },
    { value: 'diesel', label: t('vehicle.filters.diesel') },
  ]
})

const handleFilter = () => {
  emit('filter', filters.value)
}
</script>

<template>
  <base-card class="vehicle-filters">
    <div class="vehicle-filters__fields">
      <BaseSelect
        v-model="filters.type"
        :label="$t('vehicle.type')"
        :options="vehicleTypes"
        class="vehicle-filters__field"
      />

      <BaseSelect
        v-model="filters.driveType"
        :label="$t('vehicle.drive')"
        :options="vehicleDrives"
        class="vehicle-filters__field"
      />

      <div class="vehicle-filters__field vehicle-filters__field--price">
        <BaseInput
          v-model="filters.priceMin"
          :label="$t('vehicle.price')"
          class="vehicle-filters__price-input"
        />

        <span class="vehicle-filters__separator">-</span>

        <BaseInput v-model="filters.priceMax" class="vehicle-filters__price-input" />
      </div>
    </div>

    <BaseButton variant="secondary" class="vehicle-filters__button" @click="handleFilter">
      {{ $t('common.filter') }}
    </BaseButton>
  </base-card>
</template>

<style scoped lang="scss" src="./VehicleFilters.scss" />
