<template>
  <div class="overflow-hidden" ref="tableWrapper">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th v-if="selectable" class="px-5 py-3 text-left w-1/12 sm:px-6">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 rounded"
                  :checked="allSelected"
                  :indeterminate="partiallySelected"
                  @change="toggleSelectAll"
                />
              </div>
            </th>
            <th
              v-for="(col, index) in columns"
              :key="index"
              class="px-5 py-3 text-left sm:px-6"
              :class="col.width ? col.width : ''"
            >
              <p class="text-[#64748B] text-theme-xs">{{ col.title }}</p>
            </th>
          </tr>
        </thead>
      </table>
      <!-- 將 tbody 包裝在一個可滾動的容器中 -->
      <div class="tbody-container" :style="{ maxHeight: tbodyMaxHeight + 'px' }">
        <table class="min-w-full">
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="(record, index) in records"
              :key="index"
              class="border-t border-gray-100"
            >
              <td v-if="selectable" class="px-5 py-4 sm:px-6">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    class="w-4 h-4 rounded"
                    :checked="selectedRows.includes(record.id || index)"
                    @change="toggleSelect(record.id || index)"
                  />
                </div>
              </td>
              <td
                v-for="(col, colIndex) in columns"
                :key="colIndex"
                class="px-5 py-4 sm:px-6"
              >
                <template v-if="col.render">
                  <component
                    :is="col.render"
                    :record="record"
                    :index="index"
                  ></component>
                </template>
                <template v-else>
                  <slot :name="`col-${columns[colIndex].key}`" :record="record"><p class="text-[#64748B] text-theme-sm">{{ record[col.key] }}</p></slot>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue'

interface Column {
  title: string;
  key: string;
  width?: string;
  render?: any;
}

interface Props {
  columns: Column[];
  records: any[];
  selectable?: boolean;
  rowKey?: string;
  maxHeight?: number; // 可選的最大高度參數
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  rowKey: 'id',
  maxHeight: 0 // 預設為0，表示自動計算
})

const emit = defineEmits(['selectionChange'])

const selectedRows = ref<(string | number)[]>([])
const tableWrapper = ref<HTMLElement | null>(null)
const tbodyMaxHeight = ref<number>(0)

const allSelected = computed(() => {
  return props.records.length > 0 && selectedRows.value.length === props.records.length
})

const partiallySelected = computed(() => {
  return selectedRows.value.length > 0 && selectedRows.value.length < props.records.length
})

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = props.records.map((record, index) => record[props.rowKey] || index)
  }
  emit('selectionChange', selectedRows.value)
}

const toggleSelect = (id: string | number) => {
  const index = selectedRows.value.indexOf(id)
  if (index === -1) {
    selectedRows.value.push(id)
  } else {
    selectedRows.value.splice(index, 1)
  }
  emit('selectionChange', selectedRows.value)
}

watch(selectedRows, (newVal) => {
  emit('selectionChange', newVal)
})

// 計算 tbody 的最大高度
const calculateTbodyHeight = () => {
  if (!tableWrapper.value) return
  
  // 獲取 overflow-hidden 的父層元素高度
  const parentElement = tableWrapper.value.parentElement
  if (!parentElement) return
  
  const parentHeight = parentElement.clientHeight
  console.log('Parent height:', parentHeight)
  
  // 獲取表頭高度
  const theadHeight = tableWrapper.value.querySelector('thead')?.clientHeight || 0
  console.log('Thead height:', theadHeight)
  
  // 如果提供了最大高度參數，則使用該參數，否則根據父容器高度計算
  if (props.maxHeight > 0) {
    tbodyMaxHeight.value = props.maxHeight
  } else {
    // 計算 tbody 的最大高度（父容器高度減去表頭高度，再減去一些邊距）
    tbodyMaxHeight.value = Math.max(parentHeight - theadHeight - 20, 100) // 至少100px高度
  }
  
  console.log('Calculated tbody max height:', tbodyMaxHeight.value)
}

// 監聽窗口大小變化
const handleResize = () => {
  nextTick(() => {
    calculateTbodyHeight()
  })
}

onMounted(() => {
  // 使用 nextTick 確保 DOM 已完全渲染
  nextTick(() => {
    calculateTbodyHeight()
  })
  window.addEventListener('resize', handleResize)
})

// 在組件卸載時移除事件監聽器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* 添加必要的樣式 */
.tbody-container {
  overflow-y: auto;
  width: 100%;
}

/* 自定義滾動條樣式 */
.tbody-container::-webkit-scrollbar {
  width: 6px;
}

.tbody-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.tbody-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.tbody-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 保留原有的複選框樣式 */
input[type="checkbox"]:indeterminate {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath stroke='white' stroke-width='3' d='M5 12h14'/%3e%3c/svg%3e");
  background-color: #4f46e5;
  border-color: #4f46e5;
}
</style>
