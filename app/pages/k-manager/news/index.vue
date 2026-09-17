<template>
  <ManagerPage title="最新消息">
    <div class="flex flex-col h-full">
      <div
        class="py-[15px] px-[22px] flex flex-col pad:flex-row gap-4 justify-between flex-wrap border-b border-[#E2E8F0]">
        <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="標題名稱">
        <div class="flex gap-4">
          <ManagerNewsAddNewsModel v-model:isOpen="isAddModalOpened" @onAdd="onAdd">
              <template #default="{ open }">
                <button @click="open" class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
              </template>
            </ManagerNewsAddNewsModel>
          <button @click="onDeleteAchievement" class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
        </div>
      </div>
      <div class="flex-1">
        <ManagerTable :columns="columns" :records="newsList || []" :selectable="true" @selectionChange="onSelectionChange">
          <template #col-link="{ record }">
            <a :href="record.link" target="_blank" rel="noopener" class="text-[#64748B] text-theme-sm break-all hover:underline">{{ record.link }}</a>
          </template>
          <template #col-edit="{ record }">
            <SvgoEdit class="cursor-pointer" @click="onEdit(record)" filled></SvgoEdit>
          </template>
        </ManagerTable>
      </div>
      <ManagerNewsModifyNewsModel v-model:isOpen="isModifyModalOpened" :news="editingNews" @onUpdate="onUpdate"></ManagerNewsModifyNewsModel>
    </div>
  </ManagerPage>
</template>
<script setup lang="ts">
import { useDayjs } from '#dayjs'

definePageMeta({
  layout: 'manager'
})

const dayjs = useDayjs()

const columns = [
  { title: '標題', key: 'title', width: 'w-4/12' },
  { title: '連結', key: 'link', width: 'w-5/12' },
  { title: '發布時間', key: 'created_at', width: 'w-2/12' },
  { title: '編輯', key: 'edit' },
];

const isAddModalOpened = ref(false)
const isModifyModalOpened = ref(false)
const editingNews = ref<{ id: number, title: string, link: string } | null>(null)
const selectedJob = ref<number[]>([])



const { $trpcClient } = useNuxtApp()

// lazy：前端換頁時不等資料回來才切換頁面，資料到了再填入（SSR 首次載入仍會等）
const { data: news, execute, refresh } = await $trpcClient.manager.getNews.useQuery(undefined, { lazy: true })

const newsList = computed(() => {
  return news.value?.map((news) => {
    return {
      ...news,
      created_at: dayjs(news.created_at).format('YYYY/MM/DD, HH:mm:ss'),
    }
  })
})

const onAdd = async (job: any) => {
  await $trpcClient.manager.addNews.mutate(job)
  isAddModalOpened.value = false
  refresh()
}

const onEdit = (record: { id: number, title: string, link: string }) => {
  editingNews.value = { id: record.id, title: record.title, link: record.link }
  isModifyModalOpened.value = true
}

const onUpdate = async (payload: { id: number, title: string, link: string }) => {
  await $trpcClient.manager.updateNews.mutate(payload)
  isModifyModalOpened.value = false
  refresh()
}

const onSelectionChange = (selectedIds: number[]) => {
  selectedJob.value = selectedIds
};

const onDeleteAchievement = async () => {
  const confirmDelete = confirm('確定要刪除嗎？')
  if (!confirmDelete) return
  console.log(selectedJob.value)
  await $trpcClient.manager.batchDeleteNews.mutate(selectedJob.value)
  refresh()
}

</script>