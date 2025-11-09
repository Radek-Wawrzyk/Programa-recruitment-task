<script setup lang="ts">
import AppNavigation from '@/components/App/AppNavigation/AppNavigation.vue'
import AppFooter from '@/components/App/AppFooter/AppFooter.vue'
</script>

<template>
  <AppNavigation />

  <main>
    <RouterView />
  </main>

  <AppFooter />
</template>

<style scoped></style>
