<template>
  <div>
    <PageBanner image="/images/achievement-banner.png" title="工程實績" sub-title="Achievements" sub-title-color="#E8382F">
    </PageBanner>
    <PageSection title="全方位建築最佳選擇" icon-color="#E8382F">
      <div class="flex flex-col gap-6 max-w-[777px] text-[#585858] mb-14">
        <p>
          我們專注於提供高品質的預拌混凝土，支持各類工程從基礎建設到地標建築的實現。我們參與多項卓越工程實績，展現我們在精準供應、穩定品質和專業服務上的承諾。無論是大型公共建設、商業開發，還是住宅專案，我們的產品與服務始終如一，為每個項目奠定堅實基礎。
        </p>
      </div>

      <TimeMenu v-model:value="selectedYear" :tabs="years" id="show-case" class="flex-[0.6]">
        <div class="pad:hidden flex gap-2 mb-6 text-[#585858]">
          <button class="p-[10px] bg-[#D9D9D9] rounded-[5px] outline-0" @click="isListMode = false"
            :class="{ 'is-tab-active': !isListMode }">
            <SvgoPictureMode></SvgoPictureMode>
          </button>
          <button class="p-[10px] bg-[#D9D9D9] rounded-[5px] outline-0" @click="isListMode = true"
            :class="{ 'is-tab-active': isListMode }">
            <SvgoListMode></SvgoListMode>
          </button>
        </div>
        <div class="flex flex-col pad:flex-row gap-8">
          <div v-if="lg || !isListMode" class="relative pad:flex-[0.6] flex flex-col">
            <div class="pad:grid pad:grid-cols-2 gap-8  mb-9">
              <a v-if="galleryList.data.value?.data.length" v-for="gallery in galleryList.data.value.data"
                :href="`/achievements/${gallery.id}`">
                <AchievementShowCase class="cursor-pointer"
                  :image="`/files/achievements/${gallery.images.find(image => image.is_cover)?.file}`"
                  :title="gallery.name"></AchievementShowCase>
              </a>
              <NoData v-else></NoData>
            </div>
            <Pagination v-if="(galleryList.data.value?.total || 0) > 10" v-model="page" :items-per-page="10"
              :total-items="galleryList.data.value?.total || 0"></Pagination>
          </div>
          <div v-if="lg || isListMode" class="flex-[0.4]">
            <AchievementTotalContract :total="list.data.value?.length || 0"></AchievementTotalContract>
            <ul>
              <AchievementContract v-for="item in list.data.value" :unit="item.manufacturer" :location="item.name">
              </AchievementContract>
            </ul>
          </div>
        </div>
      </TimeMenu>

    </PageSection>

  </div>
</template>
<script setup lang="ts">
import useApp from '~/hooks/useApp';


definePageMeta({
  layout: 'page'
})

useHead({
  title: '工程實績'
})

const { breakpoint } = useApp()

const { lg } = breakpoint

const isListMode = ref(false)
const { $trpcClient } = useNuxtApp()

const { data: allYears, execute, refresh } = await $trpcClient.getAllAchievementYears.useQuery()

const selectedYear = ref(-1)

const list = await $trpcClient.getAchievementsByYear.useQuery(selectedYear)
const page = ref(1)
const galleryQuery = computed(() => {
  return {
    year: selectedYear.value,
    page: page.value,
  }
})

watch(page, (newPage) => {
  document.querySelector('#show-case')?.scrollIntoView({ behavior: 'smooth' })
})



const galleryList = await $trpcClient.getGalleryByYear.useQuery(galleryQuery)

interface TabItem {
  title: string;
  value: number;
}

const years = computed<TabItem[]>(() => {
  if (!allYears.value) {
    return []
  }
  const years = [{ title: 'All', value: -1 }, ...allYears.value?.map((year) => {
    return {
      title: year.toString(),
      value: year
    }
  })]
  return years || []
})

</script>

<style lang="scss" scoped>
.is-tab-active {
  @apply bg-[#E8382F] text-white;
}
</style>