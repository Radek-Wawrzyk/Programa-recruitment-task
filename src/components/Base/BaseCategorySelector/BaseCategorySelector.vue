<script setup lang="ts">
import { computed } from 'vue'

interface CategoryOption {
  id: string | number
  label: string
  value?: string | number
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null | (string | number)[]
    options: CategoryOption[]
    label?: string
    multiple?: boolean
  }>(),
  {
    label: undefined,
    multiple: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | (string | number)[]]
}>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isSelected = (optionId: string | number) => {
  if (props.multiple) {
    const selected = selectedValue.value as (string | number)[]
    return Array.isArray(selected) && selected.includes(optionId)
  }

  return selectedValue.value === optionId
}

const selectOption = (optionId: string | number) => {
  if (props.multiple) {
    const current = (selectedValue.value as (string | number)[]) || []
    const newValue = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId]
    selectedValue.value = newValue.length > 0 ? newValue : null
  } else {
    selectedValue.value = selectedValue.value === optionId ? null : optionId
  }
}
</script>

<template>
  <div class="base-category-selector">
    <label v-if="label" class="base-category-selector__label">{{ label }}</label>

    <div class="base-category-selector__options">
      <button
        v-for="option in options"
        :key="option.id"
        type="button"
        :class="[
          'base-category-selector__option',
          { 'base-category-selector__option--selected': isSelected(option.id) },
        ]"
        @click="selectOption(option.id)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./BaseCategorySelector.scss" />
