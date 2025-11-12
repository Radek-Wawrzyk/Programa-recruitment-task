<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Vehicle } from '@/types/Vehicle'
import { useI18n } from 'vue-i18n'

import BaseModal from '@/components/Base/BaseModal/BaseModal.vue'
import BaseCard from '@/components/Base/BaseCard/BaseCard.vue'
import BaseColorSelector from '@/components/Base/BaseColorSelector/BaseColorSelector.vue'
import BaseCategorySelector from '@/components/Base/BaseCategorySelector/BaseCategorySelector.vue'
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue'

interface ActiveOffer {
  version: string | null
  color: string | null
  addons: string[]
}

const props = defineProps<{
  modelValue: boolean
  vehicle: Vehicle | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const { t } = useI18n()

const currentMainImage = ref<string | null>(null)
const currentThumbnails = ref<string[]>([])

const activeOffer = ref<ActiveOffer>({
  version: null,
  color: null,
  addons: [],
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pl-PL').format(price)
}

const currentPrice = computed(() => {
  if (!props.vehicle || !activeOffer.value.version) {
    return props.vehicle?.priceFrom || 0
  }

  const selectedVersion = props.vehicle.versions.find(
    (version) => version.name === activeOffer.value.version,
  )
  return selectedVersion?.price || props.vehicle.priceFrom
})

const versionOptions = computed(() => {
  if (!props.vehicle) return []

  return props.vehicle.versions.map((version) => ({
    id: version.name,
    label: version.name,
    value: version.price,
  }))
})

const addonOptions = computed(() => {
  if (!props.vehicle || !props.vehicle.addons) return []

  return props.vehicle.addons.map((addon) => ({
    id: addon,
    label: t(`vehicle.${addon === 'winter-tires' ? 'winterTires' : 'accessories'}`),
  }))
})

const mainImage = computed(() => {
  return currentMainImage.value || props.vehicle?.images.find((image) => image.type === 'main')?.url
})

const thumbnailImages = computed(() => {
  return currentThumbnails.value.length > 0
    ? currentThumbnails.value
    : props.vehicle?.images.filter((image) => image.type === 'thumbnail').map((img) => img.url) ||
        []
})

const keyFeatures = computed(() => {
  if (!props.vehicle) return []

  const features = [
    {
      label: t('vehicle.acceleration'),
      value: `${props.vehicle.specification.accelerationTo100}s`,
    },
    {
      label: t('vehicle.maxSpeed'),
      value: `${props.vehicle.specification.maxSpeed} km/h`,
    },
  ]

  if (props.vehicle.specification.charging) {
    features.push({
      label: t('vehicle.charging'),
      value: `${props.vehicle.specification.charging} kW DC`,
    })
  }

  features.push(
    {
      label: t('vehicle.trunkCapacity'),
      value: `${props.vehicle.specification.trunkCapacity} L`,
    },
    {
      label: t('vehicle.warranty'),
      value: `${props.vehicle.specification.warranty} ${t('vehicle.years')}`,
    },
  )

  return features
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const selectImage = (imageUrl: string, thumbnailIndex: number) => {
  const previousMainImage =
    currentMainImage.value || props.vehicle?.images.find((image) => image.type === 'main')?.url

  currentMainImage.value = imageUrl

  if (previousMainImage && currentThumbnails.value.length > 0) {
    const newThumbnails = [...currentThumbnails.value]
    newThumbnails[thumbnailIndex] = previousMainImage
    currentThumbnails.value = newThumbnails
  }
}

// INFO: Select default version, color and addons (always first option)
watch(
  () => props.vehicle,
  (vehicle) => {
    if (vehicle) {
      activeOffer.value.version = vehicle.versions[0]?.name || null
      activeOffer.value.color = vehicle.colors[0]?.code || null
      activeOffer.value.addons = []
    }
  },
  { immediate: true },
)

// INFO: Reset main image and thumbnails when vehicle changes
watch(
  () => props.vehicle,
  (vehicle) => {
    if (vehicle) {
      currentMainImage.value = vehicle.images.find((image) => image.type === 'main')?.url || null
      currentThumbnails.value =
        vehicle.images.filter((image) => image.type === 'thumbnail').map((img) => img.url) || []
    }
  },
  { immediate: true },
)
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    :title="vehicle?.model"
    @update:model-value="handleClose"
    :confirm-label="$t('vehicle.findDealer')"
    show-footer
  >
    <div v-if="vehicle" class="vehicle-details-modal">
      <div class="vehicle-details-modal__content">
        <div class="vehicle-details-modal__images">
          <div class="vehicle-details-modal__main-image">
            <img v-if="mainImage" :src="mainImage" :alt="vehicle.model" />
          </div>

          <div v-if="thumbnailImages.length > 0" class="vehicle-details-modal__thumbnails">
            <button
              v-for="(thumbUrl, index) in thumbnailImages"
              :key="index"
              type="button"
              :class="[
                'vehicle-details-modal__thumbnail',
                { 'vehicle-details-modal__thumbnail--active': mainImage === thumbUrl },
              ]"
              @click="selectImage(thumbUrl, index)"
            >
              <img :src="thumbUrl" :alt="`${vehicle.model} - zdjęcie ${index + 1}`" />
            </button>
          </div>
        </div>

        <div class="vehicle-details-modal__info">
          <BaseCard class="vehicle-details-modal__section">
            <BaseCategorySelector
              v-model="activeOffer.version"
              :options="versionOptions"
              :label="$t('vehicle.version')"
            />

            <BaseColorSelector
              v-model="activeOffer.color"
              :options="vehicle.colors"
              :label="$t('vehicle.color')"
            />

            <BaseCategorySelector
              v-model="activeOffer.addons"
              :options="addonOptions"
              :label="$t('vehicle.addons')"
              multiple
            />

            <div class="vehicle-details-modal__price">
              <span class="vehicle-details-modal__price-label">{{ $t('vehicle.price') }}</span>
              <span class="vehicle-details-modal__price-value">
                {{ formatPrice(currentPrice) }} zł
              </span>
            </div>

            <BaseButton variant="secondary" full-width>{{
              $t('vehicle.findSalesPoint')
            }}</BaseButton>
          </BaseCard>

          <BaseCard class="vehicle-details-modal__section">
            <h3 class="vehicle-details-modal__section-title">{{ $t('vehicle.specifications') }}</h3>
            <div class="vehicle-details-modal__specifications">
              <div
                v-for="(feature, index) in keyFeatures"
                :key="index"
                class="vehicle-details-modal__specification"
              >
                <span class="vehicle-details-modal__specification-label">
                  {{ feature.label }}
                </span>

                <span class="vehicle-details-modal__specification-value">
                  {{ feature.value }}
                </span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss" src="./VehicleDetailsModal.scss" />
