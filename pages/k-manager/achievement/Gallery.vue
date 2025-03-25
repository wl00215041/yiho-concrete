<template>
  <ManagerPage title="工程實績">
    <ManagerRecordPage>
      <template #sidebar>
        <ManagerRecordSidebar showAction :items="yearList">
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
          <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="工程實績">
          <div class="flex gap-4">
            <button class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
            <button class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
            <button class="min-w-[110px] py-3 rounded bg-[#585858] text-white">上傳</button>
          </div>
        </div>
        <ManagerGallery class="p-6 "></ManagerGallery>
      </div>
    </ManagerRecordPage>
  </ManagerPage>
</template>
<script setup lang="ts">
const { $trpcClient } = useNuxtApp()
definePageMeta({
  layout: 'manager',
  middleware: 'sidebase-auth',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/k-manager/signin'
  }
})

const isYearModalOpened = ref(false)
const { data: years, execute, refresh } = await $trpcClient.manager.getAchievementGalleryYears.useQuery()

const yearList = computed(() => {
  return years.value?.map((year) => ({ name: year.year.toString(), value: year.year }))
})

const columns = [
  { title: '承包廠商', key: 'company', width: 'w-3/11' },
  { title: '工程實績', key: 'project', width: 'w-2/11' },
  { title: '日期', key: 'date', width: 'w-2/11' },
];



const onSelectionChange = (selectedIds: number[]) => {
  console.log('Selected rows:', selectedIds);
};

const onAddYear = async (year: number) => {
  await $trpcClient.manager.addAchievementGalleryYear.mutate({ year: year })
  refresh()
  isYearModalOpened.value = false
  // years.value.push({ name: year.toString(), value: year })
}

</script>