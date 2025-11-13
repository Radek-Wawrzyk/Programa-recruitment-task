<script setup lang="ts">
import { ref, provide, type Ref } from 'vue';

interface AccordionContext {
  openItems: Ref<Set<string>>;
  toggleItem: (id: string) => void;
  isItemOpen: (id: string) => boolean;
}

const openItems = ref<Set<string>>(new Set());

const toggleItem = (id: string) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id);
  } else {
    openItems.value.add(id);
  }
};

const isItemOpen = (id: string) => openItems.value.has(id);

const context: AccordionContext = {
  openItems,
  toggleItem,
  isItemOpen,
};

provide<AccordionContext>('accordion', context);
</script>

<template>
  <div class="base-accordion">
    <slot />
  </div>
</template>

<style scoped lang="scss" src="./BaseAccordion.scss" />
