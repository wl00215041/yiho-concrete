<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="addAchievement">
        <div class="flex flex-col gap-4">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="manufacturer">承包廠商</label>
          <input id="manufacturer" class="py-3 px-6" type="text" v-model="manufacturer" placeholder="請輸入承包廠商名稱" />
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="name">工程實績</label>
          <input id="name" class="py-3 px-6" type="text" v-model="name" placeholder="請輸入工程實績名稱" />
        </div>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded" type="submit">新增</Button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
const emit = defineEmits({
  onAdd: (payload: { manufacturer: string; name: string }) => true,
})
const manufacturer = ref<string>('')
const name = ref<string>('')

const isOpen = defineModel<boolean>('isOpen', { default: false })

// const isOpen = ref(false)
const open = () => {
  isOpen.value = true
}

const addAchievement = () => {
  emit('onAdd', {
    manufacturer: manufacturer.value,
    name: name.value,
  })
}

watch(isOpen, (value) => {
  if (!value) {
    manufacturer.value = ''
    name.value = ''
  }
})

</script>