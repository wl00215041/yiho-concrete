<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="add">
        <FormField forId="file" title="選擇檔案" required>
          <FileUpload accept="csv/*" @onSelect="handleFileSelect" description="檔案最多可上傳 1 個，檔案格式限定為 .xlsx"></FileUpload>
        </FormField>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">上傳</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';

type ListSheet = {
  files: ClientFile[];
}


const emit = defineEmits({
  onAdd: (payload: ListSheet) => true,
})


const payload = reactive<ListSheet>({
  files: []
})

const handleFileSelect = (file: ClientFile[]) => {
  payload.files = file
}


const isOpen = defineModel<boolean>('isOpen', { default: false })

// const isOpen = ref(false)
const open = () => {
  isOpen.value = true
}

const add = () => {
  if(confirm('請注意！ 上傳檔案後會覆蓋所有資料，是否確定上傳？')){
    emit('onAdd', payload)
  }
}

watch(isOpen, (value) => {
  if (!value) {
    payload.files = []

  }
})
</script>

<style lang="scss" scoped>
.selector {
  @apply h-[50px] py-3 px-[26px] border bg-white border-[#E2E8F0] focus:border-[#E2E8F0] outline-none;
}
</style>