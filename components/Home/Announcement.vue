<template>
  <div class="announcement" :class="{ 'hidden': displayNews.length === 0 }">
    <div class="title font-[NTR,Noto_Sans_TC]">What’s News</div>
    <div class="list">
      <div class="item" v-for="item in displayNews" :key="item.id">
        <div class="date hidden pad:inline-block">{{ item.date }}</div>
        <div class="tag" :class="item.class">{{ item.tag }}</div>
        <div>
          <div class="date lg:hidden">{{ item.date }}</div>
          <div class="content">
            <a v-if="item.link" :href="item.link" :target="item.linkTarget">{{ item.content }}</a>
            <span v-else>{{ item.content }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $trpcClient } = useNuxtApp()

const { data, execute, refresh } = await $trpcClient.getHomeAnnouncements.useQuery()

const achievementDate = useDateFormat(data.value?.achievement?.created_at, 'YYYY/MM/DD')
const qualityDate = useDateFormat(data.value?.quality?.created_at, 'YYYY/MM/DD')
const newsDate = useDateFormat(data.value?.news?.created_at, 'YYYY/MM/DD')

const news = computed(() => {
  return [
    {
      id: 1,
      date: achievementDate.value,
      tag: '工程實績',
      content: data.value?.achievement?.name,
      class: 'bg-[#0075C2]',
      linkTarget: '_self',
    },
    {
      id: 2,
      date: qualityDate.value,
      tag: '品質認證',
      content: data.value?.quality?.name,
      class: 'bg-[#E8382F]',
      link: data.value?.quality?.file ? `/files/certifications/${data.value?.quality?.file}` : '',
      linkTarget: '_self',
    },
    {
      id: 3,
      date: newsDate.value,
      tag: '最新消息',
      content: data.value?.news?.title,
      class: 'bg-[#585858]',
      link: data.value?.news?.link,
      linkTarget: '_blank',
    },
  ]
})

const displayNews = computed(() => {
  return news.value?.filter(item => item.content) || []
})

</script>

<style lang="scss" scoped>
.announcement {
  @apply p-6 rounded-2xl relative;
  .date {
    @apply text-xl pad:text-2xl font-[NTR];
  }
  @screen pad {
    @apply bg-[#BABABA] bg-opacity-20 mb-14 mx-[1.875rem]
  }

  @screen desktop {
    @apply absolute right-0 -bottom-0 z-10 w-[730px] h-[222px] mb-0 mx-0 rounded-bl-none px-10 py-4;

    &::after {
      content: '';
      @apply absolute bottom-0 right-0 top-1 w-[750px] h-[222px] rounded-bl-[1.875rem] z-[-1];
      background-image: url('~/assets/icons/announcement-bg.svg');
    }
  }


  >.title {
    @apply text-3xl font-[NTR] pad:text-3xl mb-2 lg:mb-6 text-[#0075C2];

    @screen desktop {
      @apply text-[2rem] h-[4.25rem] mb-0 leading-[68px];
    }
  }

  &-radius {
    left: -60px;
  }
}

.list>.item {
  @apply flex gap-2 items-center mb-4;
}

.item>.tag {
  @apply w-[50px] h-[50px] pad:min-w-24 pad:w-auto pad:h-8 text-white text-center rounded-lg py-2 px-[10px] text-sm flex items-center justify-center;

}
</style>