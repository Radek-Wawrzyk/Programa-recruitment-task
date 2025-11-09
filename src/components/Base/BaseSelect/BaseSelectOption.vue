<script setup lang="ts">
import { inject, computed, onMounted, nextTick, ref, type Ref } from 'vue'

interface Props {
  value: string | number
  label?: string
  disabled?: boolean
}

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface SelectContext {
  selectedValue: Ref<string | number | undefined>
  selectedLabel: Ref<string>
  isOpen: Ref<boolean>
  selectValue: (value: string | number, label: string) => void
  toggleOpen: () => void
  close: () => void
  registerOption: (option: SelectOption) => void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const select = inject<SelectContext>('select')
const optionRef = ref<HTMLElement | null>(null)

if (!select) {
  throw new Error('BaseSelectOption must be used inside BaseSelect')
}

const displayLabel = computed(() => {
  return props.label || String(props.value)
})

const isSelected = computed(() => select.selectedValue.value === props.value)

const handleClick = async () => {
  if (!props.disabled) {
    await nextTick()
    // Pobierz tekst z elementu jeśli label nie był podany
    const textLabel = props.label || optionRef.value?.textContent?.trim() || String(props.value)
    select.selectValue(props.value, textLabel)
  }
}

onMounted(async () => {
  await nextTick()
  // Pobierz tekst z elementu jeśli label nie był podany
  const textLabel = props.label || optionRef.value?.textContent?.trim() || String(props.value)
  select.registerOption({
    value: props.value,
    label: textLabel,
    disabled: props.disabled,
  })
})
</script>

<template>
  <button
    ref="optionRef"
    type="button"
    :class="[
      'base-select-option',
      { 'base-select-option--selected': isSelected, 'base-select-option--disabled': disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ displayLabel }}</slot>
  </button>
</template>

<style scoped lang="scss" src="./BaseSelectOption.scss" />
