<template>
  <div class="overflow-hidden">
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
              <template v-else-if="col.key === 'user'">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 overflow-hidden rounded-full">
                    <img :src="record.avatar" :alt="record.name" />
                  </div>
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm">
                      {{ record.name }}
                    </span>
                    <span class="block text-[#64748B] text-theme-xs">
                      {{ record.role }}
                    </span>
                  </div>
                </div>
              </template>
              <template v-else-if="col.key === 'team'">
                <div class="flex -space-x-2">
                  <div
                    v-for="(member, memberIndex) in record.team"
                    :key="memberIndex"
                    class="w-6 h-6 overflow-hidden border-2 border-white rounded-full"
                  >
                    <img :src="member" alt="team member" />
                  </div>
                </div>
              </template>
              <template v-else-if="col.key === 'status'">
                <span
                  :class="[
                    'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                    {
                      'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                        record.status === 'Active',
                      'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                        record.status === 'Pending',
                      'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500':
                        record.status === 'Cancel',
                    },
                  ]"
                >
                  {{ record.status }}
                </span>
              </template>
              <template v-else>
                <p class="text-[#64748B] text-theme-sm">{{ record[col.key] }}</p>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

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
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  rowKey: 'id'
})

const emit = defineEmits(['selectionChange'])

const selectedRows = ref<(string | number)[]>([])

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
</script>

<style scoped>
/* Add any additional styles here if needed */
input[type="checkbox"]:indeterminate {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath stroke='white' stroke-width='3' d='M5 12h14'/%3e%3c/svg%3e");
  background-color: #4f46e5;
  border-color: #4f46e5;
}
</style>