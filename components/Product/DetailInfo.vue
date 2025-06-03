<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center flex-1">
      <img :src="imageUrl" class="mb-6 rounded-[10px] w-full max-h-[350px] object-cover">
      <ContactButton type="phone" href="tel:037470212"></ContactButton>
    </div>

  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  imageUrl: String
})
</script>