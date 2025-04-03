<template>
  <div>
    <PageBanner image="/images/achievement-banner.png" title="工程實績" sub-title="Achievements" sub-title-color="#E8382F"></PageBanner>
    <PageSection :title="data?.name" icon-color="#E8382F">
      <AchievementContractInfo class="inline-block w-full pad:max-w-[579px] rounded-2xl mb-7" :location="data?.location"
        :product="data?.product" :finished-date="data?.finishedDate"></AchievementContractInfo>
      <yiho-carousel v-bind="config"  v-model="currentSlide">
        <yiho-slide v-for="image in images" :key="image.id">
          <template #default="{ currentIndex, isActive }">
            <img :src="image.url" alt="Gallery Image" class="gallery-image" />
          </template>
        </yiho-slide>
      </yiho-carousel>
      <yiho-carousel v-bind="thumbnailsConfig"  v-model="currentSlide">
        <yiho-slide v-for="image in images" :key="image.id">
          <template #default="{ currentIndex, isActive }">
            <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
              <img :src="image.url" alt="Thumbnail Image" class="thumbnail-image" />
            </div>
          </template>
        </yiho-slide>

        <template #addons>
          <yiho-navigation />
        </template>
      </yiho-carousel>
      <div class="text-center py-[60px]">
        <BackButton></BackButton>
      </div>
    </PageSection>

  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: 'page'
})

const { $trpcClient } = useNuxtApp()
const route = useRoute()

const { data, execute, refresh } = await $trpcClient.getGalleryById.useQuery(Number(route.params.id))

const currentSlide = ref(0)

const slideTo = (nextSlide: any) => (currentSlide.value = nextSlide)

const images = computed(() => {
  return data.value?.images.map((image) => {
    return {
      id: image.id,
      url: `/files/achievements/${image.file}`,
    }
  })
})

// const images = [
//   {
//     id: 1,
//     url: `/images/1.jpeg`,
//   },
//   {
//     id: 2,
//     url: `/images/2.jpeg`,
//   },
//   {
//     id: 3,
//     url: `/images/3.jpeg`,
//   },
//   {
//     id: 4,
//     url: `/images/1.jpeg`,
//   },
//   {
//     id: 5,
//     url: `/images/2.jpeg`,
//   },
//   {
//     id: 6,
//     url: `/images/3.jpeg`,
//   },
// ]

const config = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
  height: 600,
};

const thumbnailsConfig = {
  height: 143,
  itemsToShow: 5,
  wrapAround: true,
  touchDrag: false,
  gap: 10,
}

</script>