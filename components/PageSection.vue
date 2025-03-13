<template>
  <section class="pl-16 flex flex-col">
    <div class="flex items-center gap-5 mb-14">
      <svgo-arrow-right class="text-3xl" :style="{ color: iconColor }"></svgo-arrow-right>
      <h3 class="text-3xl font-medium">{{ title }}</h3>
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

