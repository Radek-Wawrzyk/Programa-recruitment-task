<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseAccordion from '@/components/Base/BaseAccordion/BaseAccordion.vue';
import BaseAccordionItem from '@/components/Base/BaseAccordion/BaseAccordionItem.vue';

const { t } = useI18n();

const accordionItems = computed(() => [
  {
    id: 'benefits',
    title: t('home.details.accordion.benefits.question'),
    content: t('home.details.accordion.benefits.answer'),
    defaultExpanded: true,
  },
  {
    id: 'long-distance',
    title: t('home.details.accordion.longDistance.question'),
    content: t('home.details.accordion.longDistance.answer'),
    defaultExpanded: false,
  },
  {
    id: 'service',
    title: t('home.details.accordion.service.question'),
    content: t('home.details.accordion.service.answer'),
    defaultExpanded: false,
  },
]);
</script>

<template>
  <section class="home-details">
    <div class="container">
      <h2 class="home-details__title">{{ $t('home.details.title') }}</h2>
      <p class="home-details__intro">
        {{ $t('home.details.intro-1') }}
        <br />
        {{ $t('home.details.intro-2') }}
        <br />
        {{ $t('home.details.intro-3') }}
      </p>

      <BaseAccordion>
        <BaseAccordionItem
          v-for="item in accordionItems"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :content="item.content"
          :default-expanded="item.defaultExpanded"
        />
      </BaseAccordion>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./HomeDetails.scss" />
