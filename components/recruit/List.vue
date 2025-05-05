<template>
  <div>
    <div v-for="(job, index) in jobList" :key="index"
      class="border text-[#585858] border-[#BABABA] rounded py-3 px-4 mb-2">
      <div class="flex justify-between font-bold mb-2">
        <span>{{ job.name }}</span>
        <a :href="job.link" target="_blank" class="text-[#0070C9]">
          <SvgoHyperlink filled class="text-2xl"></SvgoHyperlink>
        </a>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>經歷： {{ job.experience }}</div>
        <div>學歷： {{ job.education }}</div>
        <div class="text-nowrap">更新日期： {{ job.updated_at }}</div>
      </div>
    </div>
  </div>

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