<template>
  <div>
    <div @click.prevent.stop="handleOpen" class="flex h-[50px] border border-[#E2E8F0] text-[#64748B] mb-2">
      <button class="py-[14px] w-[138px] h-full bg-[#E2E8F0]">選擇檔案</button>
      <div class="h-full flex items-center pl-5">{{ (!multiple && selectedFiles.length > 0) ? selectedFiles[0].name : '無檔案上傳' }}</div>
    </div>
    <p class="text-sm text-[#64748B]" v-if="description">{{ description }}</p>
  </div>
</template>
<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';

const emit = defineEmits(['onSelect'])

const props = defineProps({
  multiple: Boolean,
  accept: String,
  description: String,
})

const { open, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  multiple: props.multiple,
  directory: false, // Select directories instead of files if set true
})

const handleOpen = () => {
  open()
}

const { handleFileInput, files: selectedFiles } = useFileStorage({clearOldFiles: true})


onChange(async (e) => {
  await handleFileInput({ target: { files: e } })
  emit('onSelect', selectedFiles.value)
})



</script>