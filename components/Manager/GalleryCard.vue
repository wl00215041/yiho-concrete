<template>
  <div class="relative border border-transparent inline-block w-[233px] bg-[#E2E8F0] rounded-[5px]" :class="{ checked }">
    <input type="checkbox" :checked="checked" @change="handleCheckChange" class="absolute top-2 left-2 w-4 h-4 rounded-[3px]" />
    <SvgoPinned class="absolute right-2 top-2 cursor-pointer text-xl" @click="pin" v-if="pinned" filled></SvgoPinned>
    <SvgoUnPinned class="absolute right-2 top-2 cursor-pointer text-xl" @click="pin" v-else filled></SvgoUnPinned>
    <img :src="image" class="object-cover w-full h-[127px] mb-4 cursor-pointer rounded-t-[5px]" @click="toggleChecked" alt="Image">
    <div class="flex items-center justify-between w-full px-4 mb-4">
      <span class="truncate max-w-[130px] overflow-hidden text-[#64748B]">{{ title }}</span>
      <SvgoEdit @click="$emit('onEdit')" class="w-6 h-6 flex-shrink-0 cursor-pointer" filled />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,
  image: String,
  checked: {
    type: Boolean,
    default: false
  },
  pinned: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:checked', 'onEdit', 'onPin'])

// 處理複選框變更
const handleCheckChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:checked', target.checked)
}

// 點擊圖片時切換選中狀態
const toggleChecked = () => {
  emit('update:checked', !props.checked)
}

const pin = () => {
  emit('onPin')
}

</script>
<style lang="scss" scoped>
.checked {
  @apply border border-[#0075C2];
}
</style>
