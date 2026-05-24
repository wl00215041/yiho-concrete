<template>
  <table class="table text-lg w-full border border-[#BABABA]">
    <thead class="bg-[#777777] text-white text-left">
      <tr class="text-white">
        <th class="p-4">職務名稱</th>
        <th class="p-4">經歷</th>
        <th class="p-4">學歷</th>
        <th class="p-4">更新日期</th>
        <th class="w-14"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!jobs || jobs?.length === 0">
        <td class="text-center" colspan="5">目前尚無職缺</td>
      </tr>
      <tr v-for="item in jobList" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.experience }}</td>
        <td>{{ item.education }}</td>
        <td>{{ item.updated_at }}</td>
        <td><a :href="item.link" target="_blank" class="text-[#0070C9]">
            <SvgoHyperlink filled class="text-2xl"></SvgoHyperlink>
          </a></td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()
const { $trpcClient } = useNuxtApp()

const { data: jobs, execute, refresh } = await $trpcClient.getJobs.useQuery()

const jobList = computed(() => {
  return jobs.value?.map((job) => {
    return {
      ...job,
      updated_at: dayjs(job.updated_at).format('YYYY/MM/DD, HH:mm:ss'),
    }
  })
})

</script>

<style lang="scss" scoped>
.table {
  td, th {
    @apply p-4 border border-[#BABABA];
  }
  td {
    @apply text-[#585858];
  }
}
</style>
