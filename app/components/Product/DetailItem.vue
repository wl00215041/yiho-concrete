<template>
  <li class="text-[#585858] marker:text-xs"><slot :text="text">{{ text }}</slot></li>
</template>
<script setup lang="ts">
defineProps({
  text: String
})
</script>