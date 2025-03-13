<template>
  <div class="showcase">
    <div class="showcase-wrapper">
      <SpecialRadius></SpecialRadius>
      <div class="showcase-image" />
    </div>
    <div class="showcase-title">
      <svgo-arrow-right class="showcase-arrow"></svgo-arrow-right>
      <span>實績 #1</span>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>


<style lang="scss" scoped>
.showcase {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-title {
    @apply flex items-center;
    font-size: 1.5rem;
    font-weight: 500;
  }

  &-wrapper {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    aspect-ratio: 660 / 300;
    margin-bottom: 1.5rem;
  }
  &-image {
    width: 100%;
    height: 100%;
    background-image: url('/images/1.jpeg');
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