<template>
  <li class="py-2 border-b border-b-[#BABABA] border-dashed">
    <span class="text-[#333333] font-bold mr-2">{{ unit }}</span>
    <span class="text-[#585858]">{{ location }}</span>
  </li>
</template>
<script setup lang="ts">
defineProps({
  unit: String,
  location: String
})

</script>