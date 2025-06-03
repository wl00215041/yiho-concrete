<template>
  <ManagerPage title="工程實績">
    <Toast></Toast>
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
      <div class="flex flex-col h-full">
        <div
          class="py-[15px] px-[22px] flex flex-col pad:flex-row gap-4 justify-between flex-wrap border-b border-[#E2E8F0]">
          <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="工程實績">
          <div class="flex gap-4" :class="{ 'hidden': !selectedYear}">
            <ManagerAchievementAddGalleryItemModel v-model:isOpen="isAddModelOpened" @onAdd="onAdd">
              <template #default="{ open }">
                <button @click="open" class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
              </template>
            </ManagerAchievementAddGalleryItemModel>
            <button @click="open" class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto" v-if="years?.length">
          <ManagerGallery v-model:selected-galleries="selectedGalleries" @onEdit="onEdit" @onPin="onPin" class="p-6 " :gallery-list="galleryList || []"></ManagerGallery>
        </div>
        <ManagerNoData v-else></ManagerNoData>
      </div>
    </ManagerRecordPage>
    <ManagerConfirmDialog v-model="opened" @confirm="onConfirm"></ManagerConfirmDialog>
    <ManagerAchievementModifyGalleryItemModel v-model:isOpen="isModifyModelOpened" :selected-id="editingId || 0" @on-update="onUpdate"></ManagerAchievementModifyGalleryItemModel>
  </ManagerPage>
</template>
<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';
import { useConfirm } from '~/hooks/useConfirm';
import { useToast } from '~/hooks/useToast';

const { $trpcClient } = useNuxtApp()
const toast = useToast();
definePageMeta({
  layout: 'manager',
  // auth: {
  //   unauthenticatedOnly: false,
  //   navigateUnauthenticatedTo: '/k-manager/signin'
  // }
})

const isAddModelOpened = ref(false)
const isModifyModelOpened = ref(false)
const editingId = ref<number | null>(null)
const isYearModalOpened = ref(false)
const { data: years, execute, refresh } = await $trpcClient.manager.getAchievementGalleryYears.useQuery()

const selectedYear = ref(years.value?.length ? years.value[0].year : 0)
const { data: galleryList, refresh: galleryRefresh } = await $trpcClient.manager.getAchievementGalleryList.useQuery(selectedYear)
const yearList = computed(() => {
  const pin = [ { name: '顯示於首頁', value: -1 } ]
  return pin.concat(years.value?.map((year) => ({ name: year.year.toString(), value: year.year })) || [])
})

const selectedGalleries = ref<number[]>([])

const { opened, open, onConfirm } = useConfirm({
  confirm: async () => {
    await $trpcClient.manager.batchDeleteGalleries.mutate(selectedGalleries.value)
    galleryRefresh()
  }
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

const onPin = async (id: number) => {
  try {
    await $trpcClient.manager.pinAchievementGallery.mutate({ id: id })
    galleryRefresh()  
  } catch (error) {
    toast.error('釘選不能超過 4 個')
  }
}

const onEdit = async (id: number) => {
  isModifyModelOpened.value = true
  editingId.value = id
}

const onUpdate = async (data: {id: number; location: string; name: string, product: string, files: ClientFile[], toDeleteImages: string[] }) => {
  console.log('onUpdate', data)
  await $fetch('/api/manager/gallery', {
    method: 'PUT',
    body: {
      ...data
    }
  })
  galleryRefresh()
  isModifyModelOpened.value = false
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