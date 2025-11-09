<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'
import BaseCard from '@/components/Base/BaseCard/BaseCard.vue'
import BaseInput from '@/components/Base/BaseInput/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect/BaseSelect.vue'
import BaseSelectOption from '@/components/Base/BaseSelect/BaseSelectOption.vue'

interface Filters {
  type: 'suv' | 'sedan'
  driveType: string
  priceMin: number
  priceMax: number
}

const emit = defineEmits<{
  filter: [filters: Filters]
}>()

const filters = ref<Filters>({
  type: 'suv',
  driveType: 'electric',
  priceMin: 100000,
  priceMax: 200000,
})

const handleFilter = () => {
  emit('filter', filters.value)
}
</script>

<template>
  <base-card class="vehicle-filters">
    <BaseSelect v-model="filters.type" :label="$t('cars.type')" class="vehicle-filters__field">
      <BaseSelectOption value="suv">{{ $t('filters.suv') }}</BaseSelectOption>
      <BaseSelectOption value="sedan">{{ $t('filters.sedan') }}</BaseSelectOption>
    </BaseSelect>

    <BaseSelect
      v-model="filters.driveType"
      :label="$t('cars.drive')"
      class="vehicle-filters__field"
    >
      <BaseSelectOption value="electric">{{ $t('filters.electric') }}</BaseSelectOption>
      <BaseSelectOption value="hybrid">{{ $t('filters.hybrid') }}</BaseSelectOption>
      <BaseSelectOption value="petrol">{{ $t('filters.petrol') }}</BaseSelectOption>
      <BaseSelectOption value="diesel">{{ $t('filters.diesel') }}</BaseSelectOption>
    </BaseSelect>

    <div class="vehicle-filters__field vehicle-filters__field--price">
      <BaseInput
        v-model="filters.priceMin"
        :label="$t('cars.price')"
        class="vehicle-filters__price-input"
      />

      <span class="vehicle-filters__separator">-</span>

      <BaseInput v-model="filters.priceMax" class="vehicle-filters__price-input" />
    </div>

    <BaseButton variant="secondary" class="vehicle-filters__button" @click="handleFilter">
      {{ $t('common.filter') }}
    </BaseButton>
  </base-card>
</template>

<style scoped lang="scss" src="./VehicleFilters.scss" />
