<!-- Tabs.vue -->
<template>
  <div class="tabs-container">
    <div class="tabs-header bg-gray-100 flex rounded-t-lg overflow-hidden">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="setActiveTab(index)"
        :class="[
          'px-8 py-4 text-center font-medium transition-colors duration-200 flex-1',
          activeTabIndex === index
            ? 'bg-[#0075C2] text-white'
            : 'bg-[#0075C2] bg-opacity-30 text-[#333333] hover:bg-gray-300'
        ]"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-body  rounded-b-lg">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, reactive } from 'vue'

export interface TabItem {
  title: string;
  name: string;
}

export default defineComponent({
  name: 'Tabs',
  setup() {
    const tabs = reactive<TabItem[]>([])
    const activeTabIndex = ref(0)

    const addTab = (tab: TabItem) => {
      tabs.push(tab)
    }

    const setActiveTab = (index: number) => {
      activeTabIndex.value = index
    }

    // 確保提供的狀態包含所有必需的屬性
    provide('tabsState', {
      tabs,
      activeTabIndex,
      addTab,
      setActiveTab
    })

    return {
      tabs,
      activeTabIndex,
      setActiveTab
    }
  }
})
</script>