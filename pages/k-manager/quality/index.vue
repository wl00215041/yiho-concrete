<template>
  <ManagerPage title="品質認證">
    <ManagerRecordPage>
      <template #sidebar>
        <ManagerRecordSidebar v-model:selected="selectedType" :items="items">

        </ManagerRecordSidebar>
      </template>
      <div class="flex flex-col h-full">
        <div
          class="py-[15px] px-[22px] flex flex-col pad:flex-row gap-4 justify-between flex-wrap border-b border-[#E2E8F0]">
          <input class="border border-[#E2E8F0] py-3 px-[18px] rounded-lg w-[300px]" type="text" placeholder="認證名稱">
          <div class="flex gap-4">
            <ManagerCertificationsAddCertificationModel v-model:isOpen="isAddModelOpened" @onAdd="onAdd">
              <template #default="{ open }">
                <button @click="open" class="min-w-[110px] py-3 rounded bg-[#0075C2] text-white">新增</button>
              </template>
            </ManagerCertificationsAddCertificationModel>
            <button @click="onDeleteJobs" class="min-w-[110px] py-3 rounded bg-[#E8382F] text-white">刪除</button>
          </div>
        </div>
        <div class="flex-1">
          <ManagerTable :columns="columns" :records="certificationList || []" :selectable="true"
            @selectionChange="onSelectionChange">
            <template #col-file="{ record }">
              <a v-if="record.file" :href="`/files/certifications/${record.file}`" target="_blank">
                <SvgoDocument class="cursor-pointer" filled></SvgoDocument>
              </a>

            </template>
            <template #col-edit="{ record }">
              <SvgoEdit class="cursor-pointer" @click="onEdit(record?.id)" filled></SvgoEdit>
            </template>
          </ManagerTable>
        </div>

      </div>
      <ManagerCertificationsModifyCertificationModel v-if="editingId" v-model:isOpen="isModifyModelOpened"
        :selectedId="editingId || 0" @onUpdate="onUpdate"></ManagerCertificationsModifyCertificationModel>
    </ManagerRecordPage>
  </ManagerPage>
</template>
<script setup lang="ts">
import { useDayjs } from '#dayjs'
definePageMeta({
  layout: 'manager',
})

const dayjs = useDayjs()
const { $trpcClient } = useNuxtApp()
const selectedType = ref('standard')

const items = ref([
  { name: '國家標準與證照', value: 'standard' },
  { name: '國際認證', value: 'certification' },
  { name: '碳足跡認證標準', value: 'esg' },
])

const columns = [
  { title: '認證名稱', key: 'name', width: 'w-3/11' },
  { title: '上傳日期', key: 'created_at', width: 'w-2/11' },
  { title: '檔案', key: 'file', width: 'w-2/11' },
  { title: '編輯', key: 'edit', width: 'w-2/11' },
];
const selectedCertification = ref<number[]>([])
const isAddModelOpened = ref(false)
const isModifyModelOpened = ref(false)
const editingId = ref<number | null>(null)

const { data: certifications, refresh: galleryRefresh } = await $trpcClient.manager.getCertificationsByType.useQuery(selectedType)

const certificationList = computed(() => {
  return certifications.value?.map((certification) => {
    return {
      ...certification,
      created_at: dayjs(certification.created_at).format('YYYY/MM/DD, HH:mm:ss'),
    }
  })
})

const onEdit = async (id: number) => {
  isModifyModelOpened.value = true
  editingId.value = id
}

const onAdd = async (data: any) => {
  await $fetch('/api/manager/certification', {
    method: 'POST',
    body: {
      type: selectedType.value,
      ...data
    }
  })
  await galleryRefresh()
  isAddModelOpened.value = false
}

const onUpdate = async (data: any) => {
  await $fetch('/api/manager/certification', {
    method: 'PUT',
    body: {
      ...data
    }
  })
  await galleryRefresh()
  isModifyModelOpened.value = false
}

const onDeleteJobs = async () => {
  const confirmDelete = confirm('確定要刪除嗎？')
  if (!confirmDelete) return
  await $trpcClient.manager.batchDeleteCertification.mutate(selectedCertification.value)
  galleryRefresh()
}

const onSelectionChange = (selectedIds: number[]) => {
  selectedCertification.value = selectedIds
};

</script>