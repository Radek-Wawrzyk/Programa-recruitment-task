<script setup lang="ts">
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'
import BaseCard from '@/components/Base/BaseCard/BaseCard.vue'
</script>

<template>
  <div class="home-header">
    <div class="container">
      <div class="row">
        <base-card>
          <div class="home-header__box">
            <div class="home-header__box-content">
              <h1 class="home-header__title">{{ $t('home.header.title') }}</h1>
              <p class="home-header__subtitle">{{ $t('home.header.subtitle') }}</p>
              <p class="home-header__text">{{ $t('home.header.paragraph1') }}</p>
              <p class="home-header__text">{{ $t('home.header.paragraph2') }}</p>
              <p class="home-header__text">{{ $t('home.header.paragraph3') }}</p>

              <BaseButton variant="primary" size="lg" class="home-header__button">
                {{ $t('home.header.ctaButton') }}
              </BaseButton>
            </div>
          </div>

          <div class="home-header__box-image">
            <div class="home-header__image-wrapper">
              <img src="@/assets/home/header.png" alt="Voltura" class="home-header__image" />
            </div>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./HomeHeader.scss" />
