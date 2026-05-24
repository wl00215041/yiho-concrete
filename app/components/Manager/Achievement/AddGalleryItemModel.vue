<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="add">
        <FormField forId="name" title="工程實績" required>
          <FormInput type="text" id="name" v-model="name" placeholder="請輸入工程實績名稱"></FormInput>
        </FormField>
        <FormField forId="location" title="基地位置">
          <FormInput type="text" id="location" v-model="location" placeholder="請輸入此工程實績的基地位置"></FormInput>
        </FormField>
        <FormField forId="product" title="使用產品">
          <FormInput type="text" id="product" v-model="product" placeholder="請輸入此工程實績的使用的產品"></FormInput>
        </FormField>
        <FormField forId="finishedDate" title="完工日期">
          <FormInput type="date" id="finishedDate" v-model="finishedDate" placeholder="請輸入完工日期"></FormInput>
        </FormField>
        <FormField forId="file" title="檔案上傳" required>
          <FileUpload @onSelect="handleImageSelect" multiple description="圖片最多可上傳10張，檔案格式限定為 .jpg, .png"></FileUpload>
          <div class="flex gap-6 flex-wrap">
            <ManagerAchievementSelectableImage v-for="file in files" @click="defaultName=file.name" :selected="file.name === defaultName"  :src="(file as any).content"></ManagerAchievementSelectableImage>
            <!-- <img v-for="file in files" :src="(file as any).content" class="w-[100px] h-[100px] object-cover" /> -->
          </div>
        </FormField>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">新增</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';


type EmitPayload = {
  location: string; name: string, product: string, files: ClientFile[], defaultName: string, finishedDate: string
}

const emit = defineEmits({
  onAdd: (payload: EmitPayload) => true,
})

const location = ref<string>('')
const name = ref<string>('')
const product = ref<string>('')
const finishedDate = ref<string>('')
const files = ref<ClientFile[]>([])
const defaultName = ref<string>('')
const isOpen = defineModel<boolean>('isOpen', { default: false })

// const isOpen = ref(false)
const open = () => {
  isOpen.value = true
}

const handleImageSelect = (images: ClientFile[]) => {
  if (images.length + files.value.length > 10) {
    files.value.push(...images.slice(0, 10 - files.value.length))
    alert('最多只能上傳10張圖片')
    return
  } else {
    files.value.push(...images)
  }
  if (files.value.length > 0 && !defaultName.value) {
    defaultName.value = files.value[0].name
  }
}

const add = () => {
  // if (!name.value || !location.value || !product.value || !files.value.length || !defaultName.value) {
  //   alert('請填寫完整資料')
  //   return
  // }
  emit('onAdd', {
      name: name.value,
      location: location.value,
      product: product.value,
      files: files.value,
      defaultName: defaultName.value,
      finishedDate: finishedDate.value,
    })
}

watch(isOpen, (value) => {
  if (!value) {
    location.value = ''
    name.value = ''
    product.value = ''
    files.value = []
    defaultName.value = ''
  }
})

</script>