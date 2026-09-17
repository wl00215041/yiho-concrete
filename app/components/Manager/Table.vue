<template>
  <div class="overflow-hidden" ref="tableWrapper">
    <!-- 表頭與內容必須在同一個 table 才會對齊；表頭用 sticky 固定，捲動的是整個容器 -->
    <div class="table-container max-w-full overflow-x-auto custom-scrollbar" :style="{ maxHeight: tableMaxHeight + 'px' }">
      <table class="min-w-full">
        <thead>
          <tr>
            <th v-if="selectable" class="sticky-th px-5 py-3 text-left w-1/12 sm:px-6">
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
              class="sticky-th px-5 py-3 text-left sm:px-6"
              :class="col.width ? col.width : ''"
            >
              <p class="text-[#64748B] text-theme-xs whitespace-nowrap">{{ col.title }}</p>
            </th>
          </tr>
        </thead>
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
const tableMaxHeight = ref<number>(0)

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

// 計算表格（表頭 + 內容）可捲動容器的最大高度
const calculateTableHeight = () => {
  if (!tableWrapper.value) return

  // 獲取 overflow-hidden 的父層元素高度
  const parentElement = tableWrapper.value.parentElement
  if (!parentElement) return

  // 如果提供了最大高度參數，則使用該參數，否則填滿父容器（保留一些邊距）
  if (props.maxHeight > 0) {
    tableMaxHeight.value = props.maxHeight
  } else {
    tableMaxHeight.value = Math.max(parentElement.clientHeight - 20, 100) // 至少100px高度
  }
}

// 監聽窗口大小變化
const handleResize = () => {
  nextTick(() => {
    calculateTableHeight()
  })
}

onMounted(() => {
  // 使用 nextTick 確保 DOM 已完全渲染
  nextTick(() => {
    calculateTableHeight()
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
.table-container {
  overflow-y: auto;
  width: 100%;
}

/* 表頭固定在捲動容器頂端。border-collapse 下 sticky 元素的 border 不會跟著固定，底線改用 box-shadow */
.sticky-th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  box-shadow: inset 0 -1px 0 #e5e7eb;
}

/* 自定義滾動條樣式 */
.table-container::-webkit-scrollbar {
  width: 6px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 保留原有的複選框樣式 */
input[type="checkbox"]:indeterminate {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath stroke='white' stroke-width='3' d='M5 12h14'/%3e%3c/svg%3e");
  background-color: #4f46e5;
  border-color: #4f46e5;
}
</style>
