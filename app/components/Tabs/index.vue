<!-- Tabs.vue -->
<template>
  <div class="tabs-container">
    <div ref="tabsRef" class="tabs-header bg-gray-100 flex rounded-t-lg overflow-hidden" @mousedown="startDragHandler"
      @touchstart="startDragHandler" @mousemove="moveHandler" @touchmove="moveHandler" @mouseup="endDragHandler"
      @mouseleave="endDragHandler" @touchend="endDragHandler" @touchcancel="endDragHandler">
      <button v-for="(tab, index) in tabs" :key="index" @click="setActiveTab(index)" :class="[
        'px-8 py-2 pad:py-4 text-center font-medium text-nowrap transition-colors duration-200 flex-1',
        activeTabIndex === index
          ? 'bg-[#0075C2] text-white'
          : 'bg-[#0075C2] bg-opacity-30 text-[#333333] hover:bg-gray-300'
      ]">
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-body  rounded-b-lg">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, provide, reactive } from 'vue'
import useScrollDrag from '~/hooks/useScrollDrag';

export interface TabItem {
  title: string;
  name: string;
}
const tabsRef = templateRef('tabsRef');
const { startDragHandler, moveHandler, endDragHandler, isPressed } = useScrollDrag(tabsRef)
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

// export default defineComponent({
//   name: 'Tabs',
//   setup() {


//     return {
//       tabs,
//       activeTabIndex,
//       setActiveTab
//     }
//   }
// })
</script>