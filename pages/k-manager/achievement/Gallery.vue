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
          <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="工程實績">
          <div class="flex gap-4" :class="{ 'hidden': !selectedYear}">
            <ManagerAchievementAddGalleryItemModel v-model:isOpen="isAddModelOpened" @onAdd="onAdd">
              <template #default="{ open }">
                <button @click="open" class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
              </template>
            </ManagerAchievementAddGalleryItemModel>
            <button class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
            <button class="min-w-[110px] py-3 rounded bg-[#585858] text-white">上傳</button>
          </div>
        </div>
        <ManagerGallery v-if="years?.length" class="p-6 " :gallery-list="galleryList || []"></ManagerGallery>
        <ManagerNoData v-else></ManagerNoData>
      </div>
    </ManagerRecordPage>
  </ManagerPage>
</template>
<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';

const { $trpcClient } = useNuxtApp()
definePageMeta({
  layout: 'manager',
  // middleware: 'sidebase-auth',
  // auth: {
  //   unauthenticatedOnly: false,
  //   navigateUnauthenticatedTo: '/k-manager/signin'
  // }
})

const isAddModelOpened = ref(false)

const isYearModalOpened = ref(false)
const { data: years, execute, refresh } = await $trpcClient.manager.getAchievementGalleryYears.useQuery()

const selectedYear = ref(years.value?.length ? years.value[0].year : 0)
const { data: galleryList, refresh: galleryRefresh } = await $trpcClient.manager.getAchievementGalleryList.useQuery(selectedYear)
const yearList = computed(() => {
  return years.value?.map((year) => ({ name: year.year.toString(), value: year.year }))
})



const onAdd = async (data: {location: string; name: string, product: string, files: ClientFile[]}) => {
  await $fetch('/api/manager/gallery', {
    method: 'POST',
    body: {
      year: selectedYear.value,
      ...data
    }
  })
  galleryRefresh()
  isAddModelOpened.value = false
}

const onAddYear = async (year: number) => {
  await $trpcClient.manager.addAchievementGalleryYear.mutate({ year: year })
  await refresh()
  if (!selectedYear.value && years.value?.length) {
    selectedYear.value = years.value[0].year
    refresh()
  }
  isYearModalOpened.value = false
}

</script>