<template>
  <ManagerPage title="工程實績">
    <ManagerRecordPage>
      <template #sidebar>
        <ManagerRecordSidebar showAction v-model:selected="selectedYear" :items="yearList">
          <template #action>
            <ManagerYearModel v-model:isOpen="isYearModalOpened" @onAddYear="onAddYear">
              <template #default="{open}">
                <button @click="open" class="px-[22px] py-[10px] rounded-[3px] bg-[#0075C2] font-medium text-white w-full text-left">新增年份</button>
              </template>
            </ManagerYearModel>
          </template>
        </ManagerRecordSidebar>
      </template>
      <div>
        <div
          class="py-[15px] px-[22px] flex flex-col pad:flex-row gap-4 justify-between flex-wrap border-b border-[#E2E8F0]">
          <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text"
            placeholder="承包廠商、工程實績">
          <div class="flex gap-4">
            <button class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
            <button class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
            <button class="min-w-[110px] py-3 rounded bg-[#585858] text-white">上傳</button>
          </div>
        </div>
        <ManagerTable :columns="columns" :records="users" :selectable="true" @selectionChange="onSelectionChange">
        </ManagerTable>
      </div>
    </ManagerRecordPage>
  </ManagerPage>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'manager'
})
const { $trpcClient } = useNuxtApp()

const { data: years, execute, refresh } = await $trpcClient.manager.getAchievementYears.useQuery()

const selectedYear = ref(2022)

const isYearModalOpened = ref(false)

const yearList = computed(() => {
  return years.value?.map((year) => ({ name: year.year.toString(), value: year.year }))
})
// const years = ref([
//   { name: '2025', value: 2025 },
//   { name: '2024', value: 2024 },
//   { name: '2023', value: 2023 },
//   { name: '2022', value: 2022 },
//   // { name: '2021', value: 2021 },
// ])

const columns = [
  { title: '承包廠商', key: 'company', width: 'w-3/11' },
  { title: '工程實績', key: 'project', width: 'w-2/11' },
  { title: '日期', key: 'date', width: 'w-2/11' },
];

const users = ref([
  {
    id: 1,
    company: 'Lindsey Curtis',
    project: 'Agency Website',
    date: '2023/02/02, 10:00:00',
  },
  // 其他用戶資料...
]);

const onSelectionChange = (selectedIds: number[]) => {
  console.log('Selected rows:', selectedIds);
};

const onAddYear = async (year: number) => {
  await $trpcClient.manager.addAchievementYear.mutate({ year: year })
  refresh()
  isYearModalOpened.value = false
  // years.value.push({ name: year.toString(), value: year })
}

</script>