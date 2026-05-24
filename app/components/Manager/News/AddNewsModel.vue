<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="add">
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="name">標題<Required></Required></label>
          <input id="name" class="py-3 px-6" type="text" v-model="payload.title" placeholder="請輸入標題" />
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="link">連結<Required></Required></label>
          <input id="link" class="py-3 px-6" type="text" v-model="payload.link" placeholder="請輸入連結" />
        </div>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">新增</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">

type News = {
  title: string;
  link: string;
}

const emit = defineEmits({
  onAdd: (payload: News) => true,
})

const payload = reactive<News>({
  title: '',
  link: '',
})


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
    payload.title = ''
    payload.link = ''
  }
})
</script>

<style lang="scss" scoped>
.selector {
  @apply h-[50px] py-3 px-[26px] border bg-white border-[#E2E8F0] focus:border-[#E2E8F0] outline-none;
}
</style>