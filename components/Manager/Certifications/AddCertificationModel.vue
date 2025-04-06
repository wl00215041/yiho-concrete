<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="add">
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="name">認證名稱<Required></Required></label>
          <input id="name" class="py-3 px-6" type="text" v-model="payload.name" placeholder="請輸入認證名稱" />
        </div>
        <FormField forId="file" title="選擇檔案" required>
          <FileUpload @onSelect="handleFileSelect" :accept="accepts" description="檔案最多可上傳 1 個，檔案格式限定為 .docx, .doc, .xls, .xlsx, .pdf"></FileUpload>
        </FormField>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">新增</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';

type Certification = {
  name: string;
  files: ClientFile[];
}

const accepts = '.docx,.doc,.xls,.xlsx,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/pdf'


const emit = defineEmits({
  onAdd: (payload: Certification) => true,
})


const payload = reactive<Certification>({
  name: '',
  files: []
})

const handleFileSelect = (file: ClientFile[]) => {
  console.log(file)
  payload.files = file
}


const isOpen = defineModel<boolean>('isOpen', { default: false })

// const isOpen = ref(false)
const open = () => {
  isOpen.value = true
}

const add = () => {
  emit('onAdd', payload)
}

watch(isOpen, (value) => {
  if (!value) {
    payload.name = ''
    payload.files = []

  }
})
</script>

<style lang="scss" scoped>
.selector {
  @apply h-[50px] py-3 px-[26px] border bg-white border-[#E2E8F0] focus:border-[#E2E8F0] outline-none;
}
</style>