<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl" title="新增年份">
    <div class="flex flex-col gap-4">
      <input class="py-3 px-6" type="number" v-model="year" placeholder="請輸入年份" />
      <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium" @click="addYear">新增</Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
const emit = defineEmits(['onAddYear'])
const year = ref<number>()

const isOpen = defineModel<boolean>('isOpen', { default: false })

// const isOpen = ref(false)
const open = () => {
  isOpen.value = true
}

const addYear = () => {
  emit('onAddYear', year.value)
}

watch(isOpen, (value) => {
  if (!value) {
    year.value = undefined
  }
})

</script>