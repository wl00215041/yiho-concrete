<template>
  <table class="technique-spec w-full border border-[#BABABA]">
    <thead class="bg-[#777777] text-white text-left">
      <tr>
        <th class="p-4">項目</th>
        <th class="p-4">規格</th>
      </tr>

    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.value }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">

const props = defineProps({
  items: {
    type: Array as PropType<{ name: string, value: string }[]>,
    default: () => []
  }
})

</script>

<style lang="scss" scoped>

.technique-spec {
  td {
    @apply p-4 border-b border-[#BABABA] text-[#585858];
  }
}

</style>