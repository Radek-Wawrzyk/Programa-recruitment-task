<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue';
</script>

<template>
  <nav class="app-navigation">
    <div class="container app-navigation__container">
      <img src="@/assets/logo.svg" alt="Voltura Motors" class="app-navigation__logo" />

      <base-button variant="secondary">
        {{ $t('navigation.plan-test-drive') }}
      </base-button>
    </div>
  </nav>
</template>

<style lang="scss" src="./AppNavigation.scss" scoped />
