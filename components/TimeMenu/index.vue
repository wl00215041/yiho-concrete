<!-- Tabs.vue -->
<template>
  <div class="tabs-container">
    <div class="tabs-header  flex overflow-hidden gap-4 mb-12">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="setActiveTab(index)"
        :class="[
          'px-5 min-w-24 py-[2px] text-center font-bold transition-colors duration-200 rounded-lg',
          activeTabIndex === index
            ? 'bg-[#E8382F] text-white'
            : ' bg-opacity-30 text-[#333333] hover:bg-gray-300'
        ]"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-body">
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
  name: 'TimeTabs',
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