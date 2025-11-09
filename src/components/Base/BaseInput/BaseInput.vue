<script setup lang="ts">
import { getUUID } from '@/utils'

interface Props {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  value?: string | number
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:value': [value: string | number]
  input: [event: Event]
  change: [event: Event]
}>()

const inputId = props.id || `input-${getUUID()}`

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
    </label>

    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :required="required"
      class="base-input__field"
      @input="handleInput"
      @change="handleChange"
    />
  </div>
</template>

<style scoped lang="scss" src="./BaseInput.scss" />
