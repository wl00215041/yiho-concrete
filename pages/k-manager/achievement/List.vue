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
          <div class="flex gap-4" :class="{ 'hidden': !selectedYear}">
            <ManagerAchievementAddListItemModel v-model:isOpen="isAchievementModalOpened" @onAdd="onAddAchievement">
              <template #default="{ open }">
                <button @click="open" class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
              </template>
            </ManagerAchievementAddListItemModel>
            <button @click="onDeleteAchievement" class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
            <button class="min-w-[110px] py-3 rounded bg-[#585858] text-white">上傳</button>
          </div>
        </div>
        <ManagerTable v-if="years?.length" :columns="columns" :records="achievements || []" :selectable="true" @selectionChange="onSelectionChange">
        </ManagerTable>
        <ManagerNoData v-else></ManagerNoData>
      </div>
    </ManagerRecordPage>
  </ManagerPage>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'manager',
})
const { $trpcClient } = useNuxtApp()

const { data: years, execute, refresh } = await $trpcClient.manager.getAchievementYears.useQuery()
const selectedYear = ref(years.value?.length ? years.value[0].year : 0)

const { data: achievements, refresh: achievementsRefresh } = await $trpcClient.manager.getAchievements.useQuery(selectedYear)


const isYearModalOpened = ref(false)
const isAchievementModalOpened = ref(false)
const selectedAchievement = ref<number[]>([])

const yearList = computed(() => {
  return years.value?.map((year) => ({ name: year.year.toString(), value: year.year }))
})

const columns = [
  { title: '承包廠商', key: 'manufacturer', width: 'w-3/11' },
  { title: '工程實績', key: 'name', width: 'w-2/11' },
  { title: '日期', key: 'created_at', width: 'w-2/11' },
];



const onSelectionChange = (selectedIds: number[]) => {
  selectedAchievement.value = selectedIds
};

const onAddYear = async (year: number) => {
  await $trpcClient.manager.addAchievementYear.mutate({ year: year })
  await refresh()
  if (!selectedYear.value && years.value?.length) {
    selectedYear.value = years.value[0].year
    refresh()
  }
  isYearModalOpened.value = false
  // years.value.push({ name: year.toString(), value: year })
}

const onAddAchievement = async (achievement: {manufacturer: string, name: string;}) => {
  await $trpcClient.manager.addAchievement.mutate({
    manufacturer: String(achievement.manufacturer),
    name: String(achievement.name),
    year: selectedYear.value || 0
  })
  achievementsRefresh()
  isAchievementModalOpened.value = false
} 

const onDeleteAchievement = async () => {
  await $trpcClient.manager.batchDeleteAchievements.mutate(selectedAchievement.value)
  achievementsRefresh()
}

</script>