<template>
  <div>
    <SeoHead
      title="最新消息"
      description="毅和實業最新消息與公告，掌握工程實績、品質認證與公司最新動態。"
      keywords="毅和實業最新消息,混凝土公告,工程實績,品質認證,公司動態,毅和實業"
      url="https://yiho-concrete.com.tw/news"
      image="https://yiho-concrete.com.tw/images/about.png"
    />

    <PageBanner image="/images/about-banner.png" title="最新消息" sub-title="News" sub-title-color="#0075C2">
    </PageBanner>

    <PageSection id="news-list" title="最新消息" icon-color="#0075C2">
      <div class="relative news-list" :class="{ 'min-h-[200px]': !announcements?.data?.length }">
        <template v-if="announcements?.data?.length">
          <div class="item" v-for="item in announcements.data" :key="item.id">
            <div class="date">{{ formatDate(item.date) }}</div>
            <div class="tag" :class="tagMap[item.type].class">{{ tagMap[item.type].label }}</div>
            <div class="content">
              <a v-if="item.link" :href="item.link" :target="item.linkTarget">{{ item.title }}</a>
              <span v-else>{{ item.title }}</span>
            </div>
          </div>
        </template>
        <NoData v-else></NoData>
      </div>

      <Pagination
        v-if="(announcements?.total || 0) > 10"
        v-model="page"
        :items-per-page="10"
        :total-items="announcements?.total || 0"
      ></Pagination>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import { useDayjs } from '#dayjs'

definePageMeta({
  layout: 'page',
})

const { $trpcClient } = useNuxtApp()
const dayjs = useDayjs()

const page = ref(1)
const query = computed(() => ({ page: page.value }))
const { data: announcements } = await $trpcClient.getAnnouncements.useQuery(query)

const formatDate = (date: string) => dayjs(date).format('YYYY/MM/DD')

const tagMap = {
  achievement: { label: '工程實績', class: 'bg-[#0075C2]' },
  certification: { label: '品質認證', class: 'bg-[#E8382F]' },
  news: { label: '最新消息', class: 'bg-[#585858]' },
}

watch(page, () => {
  document.querySelector('#news-list')?.scrollIntoView({ behavior: 'smooth' })
})
</script>

<style lang="scss" scoped>
.news-list > .item {
  @apply flex gap-2 pad:gap-4 items-center py-4 border-b border-b-[#D9D9D9];
}

.item > .date {
  @apply font-NTR text-lg pad:text-2xl text-[#585858] min-w-[88px] pad:min-w-[120px];
}

.item > .tag {
  @apply min-w-[72px] pad:min-w-24 h-8 text-white text-center rounded-lg py-1 px-[10px] text-sm flex items-center justify-center;
}

.item > .content {
  @apply flex-1 text-[#333333];

  a:hover {
    @apply text-[#0075C2] underline;
  }
}
</style>
