<template>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="update">
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="modify-news-title">標題<Required></Required></label>
          <input id="modify-news-title" class="py-3 px-6" type="text" v-model="payload.title" placeholder="請輸入標題" required />
        </div>
        <div class="flex flex-col gap-4 mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="modify-news-link">連結<Required></Required></label>
          <input id="modify-news-link" class="py-3 px-6" type="text" v-model="payload.link" placeholder="請輸入連結" required />
        </div>
        <button class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" type="submit">儲存</button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">

type News = {
  id: number;
  title: string;
  link: string;
}

const props = defineProps<{
  // 要編輯的那一列；列表已有全部欄位，不需要再查一次
  news: News | null
}>()

const emit = defineEmits({
  onUpdate: (payload: News) => true,
})

const payload = reactive<News>({
  id: -1,
  title: '',
  link: '',
})

const isOpen = defineModel<boolean>('isOpen', { default: false })

const update = () => {
  emit('onUpdate', { ...payload })
}

// 每次開啟時以該列目前的資料填入表單
watch([isOpen, () => props.news], ([opened, news]) => {
  if (opened && news) {
    payload.id = news.id
    payload.title = news.title
    payload.link = news.link
  }
}, { immediate: true })
</script>
