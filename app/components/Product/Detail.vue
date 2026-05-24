<template>
  <div>
    <div class="flex gap-2 mb-4">
      <slot name="icon"></slot>
      <slot name="title"><span class="text-lg font-bold">{{ title }}</span></slot>
    </div>
    <div :class="{ 'px-6 pad:p-6': withPadding }" class="pad:py-0">
      <slot>
        <ul class="list-disc list">
          <ProductDetailItem v-for="item in items">{{ item }}</ProductDetailItem>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  title: String,
  items: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  withPadding: {
    type: Boolean,
    default: true
  }
})
</script>