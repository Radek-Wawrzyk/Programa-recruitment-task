<script setup lang="ts">
import HomeHeader from '@/components/Home/HomeHeader/HomeHeader.vue'
import HomeCta from '@/components/Home/HomeCta/HomeCta.vue'
import HomeDetails from '@/components/Home/HomeDetails/HomeDetails.vue'
import HomeInfo from '@/components/Home/HomeInfo/HomeInfo.vue'
</script>

<template>
  <div class="home-view">
    <HomeHeader />
    <HomeCta />
    <HomeDetails />
    <HomeInfo />
  </div>
</template>

<style scoped>
.home-view {
  padding: 0;
}
</style>
