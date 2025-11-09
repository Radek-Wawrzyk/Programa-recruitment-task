<script setup lang="ts">
import HomeHeader from '@/components/Home/HomeHeader/HomeHeader.vue'
import HomeCta from '@/components/Home/HomeCta/HomeCta.vue'
import HomeInfo from '@/components/Home/HomeInfo/HomeInfo.vue'
</script>

<template>
  <div class="home-view">
    <HomeHeader />
    <HomeCta />
    <HomeInfo />
  </div>
</template>

<style scoped>
.home-view {
  padding: 0;
}
</style>
