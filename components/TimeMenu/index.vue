<!-- Tabs.vue -->
<template>
  <div class="tabs-container">
    <div class="tabs-header flex overflow-hidden gap-4 mb-8 desktop:mb-12">
      <button v-for="(tab, index) in tabs" :key="index" class="text-2xl" @click="setActiveTab(index)" :class="[
        'px-5 min-w-24 py-[2px] text-center font-bold transition-colors duration-200 rounded-lg',
        activeTabIndex === index
          ? 'bg-[#E8382F] text-white'
          : ' bg-opacity-30 text-[#333333] hover:bg-gray-300'
      ]">
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, provide, reactive } from 'vue'

export interface TabItem {
  title: string;
  value: string | number;
}

const props = defineProps({
  tabs: {
    type: Array as PropType<TabItem[]>,
    required: true
  }
})

const activeTabIndex = ref(0)

const setActiveTab = (index: number) => {
  activeTabIndex.value = index
}

const value = defineModel('value')

watch(value, (newValue) => {
  const index = props.tabs.findIndex((tab) => tab.value === newValue)
  if (index !== -1) {
    activeTabIndex.value = index
  }
})

watch(activeTabIndex, (newIndex) => {
  const tab = props.tabs[newIndex]
  if (tab) {
    value.value = tab.value
  }
})

provide('tabsState', {
  activeTabIndex,
  setActiveTab,
  value: props.tabs.length > 0 ? props.tabs[0].value : ''

})
</script>