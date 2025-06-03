<template>
  <li class="py-2 border-b border-b-[#BABABA] border-dashed">
    <span class="text-[#333333] inline-block max-w-[225px] font-bold mr-2 overflow-hidden text-nowrap text-ellipsis">{{ unit }}</span>
    <span class="text-[#585858] inline-block max-w-[214px] overflow-hidden text-nowrap text-ellipsis">{{ location }}</span>
  </li>
</template>
<script setup lang="ts">
defineProps({
  unit: String,
  location: String
})

</script>