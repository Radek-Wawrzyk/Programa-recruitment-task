<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { VehicleFilters } from '@/types/Vehicle'
import { useI18n } from 'vue-i18n'

import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'
import BaseCard from '@/components/Base/BaseCard/BaseCard.vue'
import BaseInput from '@/components/Base/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect/BaseSelect.vue'

const props = defineProps<{
  filters: VehicleFilters
}>()

const emit = defineEmits<{
  filter: [filters: VehicleFilters]
}>()

const { t } = useI18n()

const localFilters = ref<VehicleFilters>({ ...props.filters })

// Synchronizuj z props (gdy zmienią się z zewnątrz)
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters }
  },
  { deep: true },
)

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
  emit('filter', { ...localFilters.value })
}
</script>

<template>
  <base-card class="vehicle-filters">
    <div class="vehicle-filters__fields">
      <BaseSelect
        v-model="localFilters.type"
        :label="$t('vehicle.type')"
        :options="vehicleTypes"
        class="vehicle-filters__field"
      />

      <BaseSelect
        v-model="localFilters.driveType"
        :label="$t('vehicle.drive')"
        :options="vehicleDrives"
        class="vehicle-filters__field"
      />

      <div class="vehicle-filters__field vehicle-filters__field--price">
        <BaseInput
          v-model.number="localFilters.priceMin"
          :label="$t('vehicle.price')"
          type="number"
          class="vehicle-filters__price-input"
        />

        <span class="vehicle-filters__separator">-</span>

        <BaseInput
          v-model.number="localFilters.priceMax"
          type="number"
          class="vehicle-filters__price-input"
        />
      </div>
    </div>

    <BaseButton variant="secondary" class="vehicle-filters__button" @click="handleFilter">
      {{ $t('common.filter') }}
    </BaseButton>
  </base-card>
</template>

<style scoped lang="scss" src="./VehicleFilters.scss" />
