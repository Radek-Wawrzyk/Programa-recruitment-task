<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, type Ref } from 'vue'
import { getUUID } from '@/utils'

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

interface Props {
  id?: string
  label?: string
  placeholder?: string
  value?: string | number
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:value': [value: string | number]
  change: [value: string | number]
}>()

const selectId = props.id || `select-${getUUID()}`
const isOpen = ref(false)
const selectedValue = ref<string | number | undefined>(props.value)
const selectedLabel = ref<string>('')
const options = ref<SelectOption[]>([])
const selectRef = ref<HTMLElement | null>(null)

const selectValue = (value: string | number, label: string) => {
  selectedValue.value = value
  selectedLabel.value = label
  emit('update:value', value)
  emit('change', value)
  close()
}

const toggleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const close = () => {
  isOpen.value = false
}

const registerOption = (option: SelectOption) => {
  options.value.push(option)
  if (option.value === props.value) {
    selectedLabel.value = option.label
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    close()
  }
}

const context: SelectContext = {
  selectedValue,
  selectedLabel,
  isOpen,
  selectValue,
  toggleOpen,
  close,
  registerOption,
}

provide<SelectContext>('select', context)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="selectRef" class="base-select" :class="{ 'base-select--open': isOpen }">
    <label v-if="label" :for="selectId" class="base-select__label">
      {{ label }}
    </label>
    <div class="base-select__wrapper">
      <button
        :id="selectId"
        type="button"
        :disabled="disabled"
        :class="['base-select__field', { 'base-select__field--open': isOpen }]"
        @click="toggleOpen"
      >
        <span class="base-select__value">
          {{ selectedLabel || placeholder || 'Wybierz...' }}
        </span>
      </button>
      <div v-if="isOpen" class="base-select__dropdown">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./BaseSelect.scss" />
