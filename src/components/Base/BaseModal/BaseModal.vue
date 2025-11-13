<script setup lang="ts">
import { onMounted, onUnmounted, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseButton from '@/components/Base/BaseButton/BaseButton.vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showFooter?: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
  }>(),
  {
    closeOnBackdrop: true,
    closeOnEscape: true,
    showFooter: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
  cancel: [];
  confirm: [];
}>();

const { t } = useI18n();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleCancel = () => {
  emit('cancel');
  close();
};

const handleConfirm = () => {
  emit('confirm');
};

const handleBackdropClick = (event: MouseEvent) => {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    close();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === 'Escape' && props.modelValue) {
    close();
  }
};

const cancelText = computed(() => {
  return props.cancelLabel || t('common.cancel');
});

const confirmText = computed(() => {
  return props.confirmLabel || t('common.confirm');
});

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
);

onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleEscape);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="base-modal" @click="handleBackdropClick">
        <div class="base-modal__backdrop" />
        <div class="base-modal__container" role="dialog" aria-modal="true">
          <header v-if="title" class="base-modal__header">
            <h2 class="base-modal__title">{{ title }}</h2>

            <button class="base-modal__close" @click="close" aria-label="Zamknij" type="button">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#6B7280"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </header>

          <div class="base-modal__content">
            <slot />
          </div>

          <footer v-if="showFooter" class="base-modal__footer">
            <BaseButton variant="tertiary" @click="handleCancel">
              {{ cancelText }}
            </BaseButton>

            <BaseButton variant="primary" @click="handleConfirm">
              {{ confirmText }}
            </BaseButton>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss" src="./BaseModal.scss" />
