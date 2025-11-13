<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    options: { name: string; code: string }[];
    label?: string;
  }>(),
  {
    label: 'Kolor',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
}>();

const selectedColor = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const selectColor = (colorCode: string) => {
  selectedColor.value = colorCode;
};
</script>

<template>
  <div class="base-color-selector">
    <label v-if="label" class="base-color-selector__label">{{ label }}</label>
    <div class="base-color-selector__options">
      <button
        v-for="color in options"
        :key="color.code"
        type="button"
        :class="[
          'base-color-selector__option',
          { 'base-color-selector__option--selected': selectedColor === color.code },
        ]"
        :style="{ backgroundColor: color.code }"
        :aria-label="color.name"
        @click="selectColor(color.code)"
      ></button>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./BaseColorSelector.scss" />
