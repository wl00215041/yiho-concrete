<template>
  <input class="py-3 px-6" type="text" v-bind="$attrs" v-model="value" />
</template>

<script setup lang="ts">
const value = defineModel('value')
</script>