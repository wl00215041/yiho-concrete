<!-- Tab.vue -->
<template>
  <transition name="fade" mode="out-in">
    <div v-if="isActive" class="tab-content">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, inject, computed, onMounted, ref } from 'vue'
import type { TabItem } from './index.vue'

interface TabsState {
  tabs: TabItem[];
  activeTabIndex: { value: number };
  addTab: (tab: TabItem) => void;
}

export default defineComponent({
  name: 'TimeTabsTab',
  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const tabsState = inject<TabsState>('tabsState')

    // 確保 Tab 組件在 Tabs 組件內使用
    if (!tabsState) {
      console.error('Tab 組件必須在 Tabs 組件內使用')
      return { isActive: ref(false) }
    }

    const index = ref(-1)

    onMounted(() => {
      const tabName = props.name || `tab-${Date.now()}`
      tabsState.addTab({
        title: props.title,
        name: tabName
      })
      index.value = tabsState.tabs.length - 1
    })

    const isActive = computed(() => {
      return index.value === tabsState.activeTabIndex.value
    })

    return {
      isActive
    }
  }
})
</script>

<style scoped>
.tab-content {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>