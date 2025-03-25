<template>
  <ManagerPage title="職缺資訊">
    <div>
      <div
        class="py-[15px] px-[22px] flex flex-col pad:flex-row gap-4 justify-between flex-wrap border-b border-[#E2E8F0]">
        <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="承包廠商、工程實績">
        <div class="flex gap-4">
          <button class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
          <button class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
        </div>
      </div>
      <ManagerTable :columns="columns" :records="jobs || []" :selectable="true" @selectionChange="onSelectionChange">
        <!-- <template #col-file>
          <SvgoDocument class="cursor-pointer" filled></SvgoDocument>
        </template>
        <template #col-edit="record">
          <SvgoEdit class="cursor-pointer" filled></SvgoEdit>
        </template> -->
      </ManagerTable>
    </div>
  </ManagerPage>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'manager',
})

const columns = [
  { title: '職缺名稱', key: 'name', width: 'w-3/11' },
  { title: '經歷', key: 'experience', width: 'w-2/11' },
  { title: '學歷', key: 'education', width: 'w-2/11' },
  { title: '連結', key: 'link', width: 'w-2/11' },
  { title: '發布時間', key: 'date', width: 'w-2/11' },
];

const { $trpcClient } = useNuxtApp()

const { data: jobs, execute, refresh } = await $trpcClient.manager.getJobs.useQuery()


const onSelectionChange = (selectedIds: number[]) => {
  console.log('Selected rows:', selectedIds);
};

</script>