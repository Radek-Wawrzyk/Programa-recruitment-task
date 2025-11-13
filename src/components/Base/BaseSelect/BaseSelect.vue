<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getUUID } from '@/utils';

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    placeholder?: string;
    modelValue?: string | number;
    options: { value: string | number; label: string; disabled?: boolean }[];
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  change: [value: string | number];
}>();

const selectId = props.id || `select-${getUUID()}`;
const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null);

const selectedValue = computed(() => props.modelValue);

const selectedLabel = computed(() => {
  if (!selectedValue.value) return '';
  const option = props.options.find((opt) => opt.value === selectedValue.value);
  return option?.label || '';
});

const isSelected = (value: string | number) => {
  return selectedValue.value === value;
};

const selectValue = (value: string | number) => {
  if (isOpen.value) {
    emit('update:modelValue', value);
    emit('change', value);
    close();
  }
};

const toggleOpen = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const close = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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

      <ul v-if="isOpen" class="base-select__dropdown">
        <li
          v-for="option in options"
          :key="option.value"
          :class="[
            'base-select__option',
            {
              'base-select__option--selected': isSelected(option.value),
              'base-select__option--disabled': option.disabled,
            },
          ]"
        >
          <button type="button" :disabled="option.disabled" @click="selectValue(option.value)">
            {{ option.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./BaseSelect.scss" />
