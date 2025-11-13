<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';

interface AccordionContext {
  openItems: Ref<Set<string>>;
  toggleItem: (id: string) => void;
  isItemOpen: (id: string) => boolean;
}

const props = defineProps<{
  id: string;
  title: string;
  content: string;
}>();

const accordion = inject<AccordionContext>('accordion');

const isOpen = computed(() => accordion?.isItemOpen(props.id) || false);

const handleToggle = () => {
  accordion?.toggleItem(props.id);
};
</script>

<template>
  <div class="base-accordion-item" :class="{ 'base-accordion-item--open': isOpen }">
    <button
      class="base-accordion-item__header"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="`accordion-content-${id}`"
      @click="handleToggle"
    >
      <span class="base-accordion-item__title">{{ title }}</span>
      <span
        class="base-accordion-item__icon"
        :class="{ 'base-accordion-item__icon--open': isOpen }"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <div
      :id="`accordion-content-${id}`"
      class="base-accordion-item__content"
      :class="{ 'base-accordion-item__content--open': isOpen }"
    >
      <div class="base-accordion-item__body">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./BaseAccordionItem.scss" />
