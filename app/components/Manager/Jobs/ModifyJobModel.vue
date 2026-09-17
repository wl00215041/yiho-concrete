<template>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="update">
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="modify-job-name">職缺名稱<Required></Required></label>
          <input id="modify-job-name" class="py-3 px-6" type="text" v-model="payload.name" placeholder="請輸入職缺名稱" required />
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="modify-job-edu">學歷要求<Required></Required></label>
          <select v-model="payload.education" id="modify-job-edu" class="selector" required>
            <option v-for="option in educationOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="modify-job-exp">經歷要求<Required></Required></label>
          <select v-model="payload.experience" id="modify-job-exp" class="selector" required>
            <option v-for="option in experienceOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="modify-job-link">職缺連結<Required></Required></label>
          <input id="modify-job-link" class="py-3 px-6" type="text" v-model="payload.link" placeholder="請輸入職缺連結" required />
        </div>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">儲存</button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">

type Job = {
  id: number;
  name: string;
  experience: string;
  education: string;
  link: string;
}

// 與 AddJobModel 的選項一致
const EDUCATION_OPTIONS = ['不拘', '國中以上', '高中職以上', '大學以上', '碩士以上']
const EXPERIENCE_OPTIONS = ['不拘', '1年以上', '3年以上', '5年以上', '10年以上']

const props = defineProps<{
  // 要編輯的那一列；列表已有全部欄位，不需要再查一次
  job: Job | null
}>()

const emit = defineEmits({
  onUpdate: (payload: Job) => true,
})

const payload = reactive<Job>({
  id: -1,
  name: '',
  experience: '',
  education: '',
  link: '',
})

// 舊資料的值若不在選項內，仍要能顯示並保留
const withCurrent = (options: string[], current?: string) =>
  current && !options.includes(current) ? [...options, current] : options
const educationOptions = computed(() => withCurrent(EDUCATION_OPTIONS, props.job?.education))
const experienceOptions = computed(() => withCurrent(EXPERIENCE_OPTIONS, props.job?.experience))

const isOpen = defineModel<boolean>('isOpen', { default: false })

const update = () => {
  emit('onUpdate', { ...payload })
}

// 每次開啟時以該列目前的資料填入表單
watch([isOpen, () => props.job], ([opened, job]) => {
  if (opened && job) {
    payload.id = job.id
    payload.name = job.name
    payload.experience = job.experience
    payload.education = job.education
    payload.link = job.link
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.selector {
  @apply h-[50px] py-3 px-[26px] border bg-white border-[#E2E8F0] focus:border-[#E2E8F0] outline-none;
}
</style>
