<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue';
import BaseCard from '@/components/Base/BaseCard/BaseCard.vue';

import { useSanitize } from '@/composables/useSanitize';

const { sanitize } = useSanitize();
</script>

<template>
  <header class="home-header">
    <div class="container">
      <base-card class="home-header__card">
        <div class="home-header__content">
          <h1 class="home-header__title">{{ $t('home.header.title') }}</h1>
          <p class="home-header__subtitle">{{ $t('home.header.subtitle') }}</p>

          <p class="home-header__text" v-html="sanitize($t('home.header.body'))"></p>

          <BaseButton variant="primary" size="lg" class="home-header__button">
            {{ $t('home.header.ctaButton') }}
          </BaseButton>
        </div>

        <div class="home-header__image-wrapper">
          <img src="@/assets/home/header.png" alt="Voltura" class="home-header__image" />
        </div>
      </base-card>
    </div>
  </header>
</template>

<style scoped lang="scss" src="./HomeHeader.scss" />
