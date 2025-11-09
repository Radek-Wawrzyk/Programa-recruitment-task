<script setup lang="ts"></script>

<template>
  <section class="home-info">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="home-info__banner">
            <div class="home-info__background">
              <img src="@/assets/home/info.png" alt="Voltura" class="home-info__background-image" />
            </div>

            <h2 class="home-info__title">{{ $t('home.info.title') }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./HomeInfo.scss" />
