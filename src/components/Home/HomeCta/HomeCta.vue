<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'
</script>

<template>
  <section class="home-cta">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="home-cta__banner">
            <h2 class="home-cta__title">{{ $t('home.cta.title') }}</h2>

            <BaseButton variant="light" size="lg" class="home-cta__button">
              {{ $t('home.cta.button') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./HomeCta.scss" />
