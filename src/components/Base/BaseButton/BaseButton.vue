<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary' | 'light';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    outline?: boolean;
    block?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    block: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const classes = ['base-button'];

  classes.push(`base-button--${props.variant}`);

  if (props.size === 'sm') {
    classes.push('base-button--sm');
  } else if (props.size === 'lg') {
    classes.push('base-button--lg');
  }

  if (props.block) {
    classes.push('base-button--full-width');
  }

  return classes.join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<style scoped lang="scss" src="./BaseButton.scss" />
