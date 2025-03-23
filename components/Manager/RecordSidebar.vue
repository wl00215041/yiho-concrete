<template>
  <div class="flex flex-col">
    <div class="px-4 pt-4 pb-6" :class="{ 'visible' : showAction, 'invisible': !showAction }">
      <slot name="action"></slot>
    </div>
    <div>
      <slot>
        <ul class="text-[#64748B] font-medium flex pad:flex-col">
          <li class="px-[22px] py-[10px] cursor-pointer" :class="{ active: selected === item.value }" @click="onSelect(item)" v-for="item in items">{{ item.name }}</li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">

type Item = {
  name: string,
  value: any
}

defineProps({
  items: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  showAction: {
    type: Boolean,
    default: false
  }
})

const activeIndex = ref<undefined | string>()

const selected = defineModel('selected')

const onSelect = (item: Item) => {
  selected.value = item.value
}

</script>

<style lang="scss" scoped>

.active {
  @apply relative bg-[#0075C2] bg-opacity-5 text-[#0075C2] before:content-[''] before:absolute before:w-[3px] before:h-full before:left-0 before:top-0 before:bg-[#0075C2]
}

</style>