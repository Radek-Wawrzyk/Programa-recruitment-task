<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'
</script>

<template>
  <nav class="app-navigation">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <img src="@/assets/logo.svg" alt="Voltura Motors" class="app-navigation__logo" />
        </div>

        <div class="col-6 justify-content-end d-flex">
          <base-button variant="secondary">
            {{ $t('navigation.plan-test-drive') }}
          </base-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" src="./AppNavigation.scss" scoped />
