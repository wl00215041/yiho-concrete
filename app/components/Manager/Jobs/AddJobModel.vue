<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="add">
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="name">職缺名稱<Required></Required></label>
          <input id="name" class="py-3 px-6" type="text" v-model="payload.name" placeholder="請輸入職缺名稱" />
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="edu">學歷要求<Required></Required></label>
          <select v-model="payload.education" id="edu" class="selector"  placeholder="請選擇學歷要求">
            <option value="不拘">不拘</option>
            <option value="國中以上">國中以上</option>
            <option value="高中職以上">高中職以上</option>
            <option value="大學以上">大學以上</option>
            <option value="碩士以上">碩士以上</option>
          </select>
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="exp">經歷要求<Required></Required></label>
          <select v-model="payload.experience" id="edu" class="selector" placeholder="請選擇經歷要求">
            <option value="不拘">不拘</option>
            <option value="1年以上">1年以上</option>
            <option value="3年以上">3年以上</option>
            <option value="5年以上">5年以上</option>
            <option value="10年以上">10年以上</option>
          </select>
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="link">職缺連結<Required></Required></label>
          <input id="link" class="py-3 px-6" type="text" v-model="payload.link" placeholder="請輸入職缺名稱" />
        </div>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">新增</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">

type Job = {
  name: string;
  experience: string;
  education: string;
  link: string;
}

const emit = defineEmits({
  onAdd: (payload: Job) => true,
})

const payload = reactive<Job>({
  name: '',
  experience: '',
  education: '',
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
    payload.name = ''
    payload.experience = ''
    payload.education = ''
    payload.link = ''
  }
})
</script>

<style lang="scss" scoped>
.selector {
  @apply h-[50px] py-3 px-[26px] border bg-white border-[#E2E8F0] focus:border-[#E2E8F0] outline-none;
}
</style>