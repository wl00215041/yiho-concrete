<template>
  <section class="px-6 pad:px-16 desktop:px-[6.875rem] flex flex-col">
    <div class="flex items-center gap-5 mb-6 pad:mb-8 desktop:mb-14">
      <slot name="icon"><svgo-arrow-right class="text-lg pad:text-2xl desktop:text-3xl" :style="{ color: iconColor }"></svgo-arrow-right></slot>
      <h3 class="text-lg pad:text-2xl desktop:text-3xl font-medium">
        <slot name="title" :title="title">{{ title }}</slot>
      </h3>
    </div>
    <slot></slot>
  </section>
</template>
<script setup lang="ts">

defineProps({
  title: String,
  iconColor: String,
})

</script>

