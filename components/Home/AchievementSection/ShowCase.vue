<template>
  <div class="showcase" :style="{ '--image': `url(${image})` }" @click="$router.push(`/achievements/${id}`)">
    <div class="showcase-wrapper">
      <SpecialRadius></SpecialRadius>
      <div class="showcase-image" />
    </div>
    <div class="showcase-title" >
      <svgo-arrow-right class="showcase-arrow"></svgo-arrow-right>
      <span class="flex-1">{{ title }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  title: String,
  image: String,
  id: Number
})

</script>


<style lang="scss" scoped>
.showcase {
  @apply flex flex-col overflow-hidden cursor-pointer basis-[18.75rem] pad:basis-[29.375rem] desktop:basis-[655px] shrink-0;
  &-title {
    @apply flex items-center;
    font-size: 1.5rem;
    font-weight: 500;
  }

  &-wrapper {
    @apply relative overflow-hidden;
    border-radius: 15px;
    // aspect-ratio: 660 / 300;
    margin-bottom: 1.5rem;
  }
  &-image {
    @apply w-full h-[12.5rem] pad:h-[13.5rem] desktop:h-[18.9375rem];
    background-image: var(--image);
    background-size: cover;
    border-radius: 15px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
  &-arrow {
    width: 2rem;
    height: 2rem;
    color: #777777;
    margin-right: .75rem;

  }
}
</style>