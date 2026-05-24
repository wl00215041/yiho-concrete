<template>
  <ManagerPage title="職缺資訊">
    <div class="flex flex-col h-full">
      <div
        class="py-[15px] px-[22px] flex flex-col pad:flex-row gap-4 justify-between flex-wrap border-b border-[#E2E8F0]">
        <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="職缺名稱">
        <div class="flex gap-4">
          <ManagerJobsAddJobModel v-model:isOpen="isAddModalOpened" @onAdd="onAdd">
            <template #default="{ open }">
              <button @click="open" class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
            </template>
          </ManagerJobsAddJobModel>
          <button @click="open" class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
        </div>
      </div>
      <div class="flex-1">
        <ManagerTable :columns="columns" :records="jobList || []" :selectable="true"
          @selectionChange="onSelectionChange">

        </ManagerTable>
      </div>

      <ManagerConfirmDialog v-model="opened" @confirm="onConfirm"></ManagerConfirmDialog>
    </div>
  </ManagerPage>
</template>
<script setup lang="ts">
import { useDayjs } from '#dayjs'
import { useConfirm } from '~/hooks/useConfirm';

definePageMeta({
  layout: 'manager'
})

const dayjs = useDayjs()

const columns = [
  { title: '職缺名稱', key: 'name', width: 'w-3/11' },
  { title: '經歷', key: 'experience', width: 'w-2/11' },
  { title: '學歷', key: 'education', width: 'w-2/11' },
  { title: '連結', key: 'link', width: 'w-2/11' },
  { title: '發布時間', key: 'created_at', width: 'w-2/11' },
];

const isAddModalOpened = ref(false)
const selectedJob = ref<number[]>([])

const { opened, open, onConfirm } = useConfirm({
  confirm: async () => {
    await $trpcClient.manager.batchDeleteJobs.mutate(selectedJob.value)
    refresh()
  }
})

const { $trpcClient } = useNuxtApp()

const { data: jobs, execute, refresh } = await $trpcClient.manager.getJobs.useQuery()

const jobList = computed(() => {
  return jobs.value?.map((job) => {
    return {
      ...job,
      created_at: dayjs(job.created_at).format('YYYY/MM/DD, HH:mm:ss'),
    }
  })
})

const onAdd = async (job: any) => {
  await $trpcClient.manager.addJob.mutate(job)
  isAddModalOpened.value = false
  refresh()
}

const onSelectionChange = (selectedIds: number[]) => {
  selectedJob.value = selectedIds
};

</script>