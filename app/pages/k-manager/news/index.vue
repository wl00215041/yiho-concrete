<template>
  <ManagerPage title="最新消息">
    <div>
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
      <ManagerTable :columns="columns" :records="newsList || []" :selectable="true" @selectionChange="onSelectionChange">

      </ManagerTable>
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
  { title: '標題', key: 'title', width: 'w-3/11' },
  { title: '連結', key: 'link', width: 'w-2/11' },
  { title: '發布時間', key: 'created_at', width: 'w-2/11' },
];

const isAddModalOpened = ref(false)
const selectedJob = ref<number[]>([])



const { $trpcClient } = useNuxtApp()

const { data: news, execute, refresh } = await $trpcClient.manager.getNews.useQuery()

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