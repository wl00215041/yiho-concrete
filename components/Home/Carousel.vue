<template>
  <yiho-carousel v-bind="config">
    <yiho-slide v-for="image in images" :key="image.id">
      <div class="background h-full w-full lg:rounded-[1.875rem]" :style="{ '--image-url': `url(${image.url})` }"></div>
      <!-- <img :src="image.url" alt="image" /> -->
    </yiho-slide>

    <template #addons>
      <yiho-navigation />
    </template>
  </yiho-carousel>
</template>
<script setup lang="ts">


const images = [
  {
    id: 1,
    url: `/images/1.jpeg`,
  },
  {
    id: 2,
    url: `/images/2.jpeg`,
  },
  {
    id: 3,
    url: `/images/3.jpeg`,
  },
]

const config = ref({
  height: 584,
  itemsToShow: 1,
  gap: 24,
  // snapAlign: 'center-even',
  autoplay: 4000,
  // wrapAround: true,
  pauseAutoplayOnHover: true,
  breakpoints: {
    // 1024 and up
    1024: {
      height: 420,
      itemsToShow: 2,
      snapAlign: 'start',
    },
    1440: {
      height: 600,
      itemsToShow: 3,
      snapAlign: 'start',
    },
  }
});

</script>

<style lang="scss">
.carousel__slide {
  // @apply h-[36.5rem] lg:h-[26.25rem];

  // overflow: hidden;
  // justify-content: center;
  // align-items: center;
  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

</style>

<style lang="scss" scoped>
.background {
  background-image: var(--image-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>