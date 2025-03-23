<template>
  <ManagerPage title="工程實績">
    <ManagerRecordPage>
      <template #sidebar>
        <ManagerRecordSidebar v-model:selected="selectedYear" :items="years">

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
          <template #col-file>
            <SvgoDocument class="cursor-pointer" filled></SvgoDocument>
          </template>
          <template #col-edit="record">
            <SvgoEdit class="cursor-pointer" filled></SvgoEdit>
          </template>
        </ManagerTable>
      </div>
    </ManagerRecordPage>
  </ManagerPage>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'manager'
})

const selectedYear = ref(2022)

const years = ref([
  { name: '國家標準與法規', value: 'standard' },
  { name: '國際認證', value: 'international-certification' },
])

const columns = [
  { title: '認證名稱', key: 'name', width: 'w-3/11' },
  { title: '上傳日期', key: 'date', width: 'w-2/11' },
  { title: '檔案', key: 'file', width: 'w-2/11' },
  { title: '編輯', key: 'edit', width: 'w-2/11' },
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

</script>