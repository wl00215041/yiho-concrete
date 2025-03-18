<template>
  <div>
    <PageBanner image="/images/6.jpeg" title="工程實績" sub-title="Achievements" sub-title-color="#E8382F"></PageBanner>
    <PageSection title="全方位建築最佳選擇" icon-color="#E8382F">
      <div class="flex flex-col gap-6 max-w-[777px] text-[#585858] mb-14">
        <p>
          我們專注於提供高品質的預拌混凝土，支持各類工程從基礎建設到地標建築的實現。我們參與多項卓越工程實績，展現我們在精準供應、穩定品質和專業服務上的承諾。無論是大型公共建設、商業開發，還是住宅專案，我們的產品與服務始終如一，為每個項目奠定堅實基礎。
        </p>
      </div>

      <TimeMenu :tabs="years" class="flex-[0.6]">
        <div class="desktop:hidden flex gap-2 mb-6">
          <button class="p-[10px] bg-[#D9D9D9] rounded-[5px]" @click="isListMode = false"
            :class="{ 'is-tab-active': !isListMode }">
            <SvgoPictureMode filled></SvgoPictureMode>
          </button>
          <button class="p-[10px] bg-[#D9D9D9] rounded-[5px]" @click="isListMode = true"
            :class="{ 'is-tab-active': isListMode }">
            <SvgoListMode filled></SvgoListMode>
          </button>
        </div>
        <div class="flex flex-col pad:flex-row gap-8">
          <div v-if="lg || !isListMode" class="pad:flex-[0.6] grid grid-cols-1 pad:grid-cols-2 gap-8">
            <AchievementShowCase class="" @click="$router.push({ name: 'achievements-id', params: {id: 1} })" image="/images/7.jpeg" title="實績 #1"></AchievementShowCase>
            <AchievementShowCase class="" @click="$router.push({ name: 'achievements-id', params: {id: 1} })" image="/images/7.jpeg" title="實績 #1"></AchievementShowCase>
            <AchievementShowCase class="" @click="$router.push({ name: 'achievements-id', params: {id: 1} })" image="/images/7.jpeg" title="實績 #1"></AchievementShowCase>
            <AchievementShowCase class="" @click="$router.push({ name: 'achievements-id', params: {id: 1} })" image="/images/7.jpeg" title="實績 #1"></AchievementShowCase>
            <AchievementShowCase class="" @click="$router.push({ name: 'achievements-id', params: {id: 1} })" image="/images/7.jpeg" title="實績 #1"></AchievementShowCase>
            <AchievementShowCase class="" @click="$router.push({ name: 'achievements-id', params: {id: 1} })" image="/images/7.jpeg" title="實績 #1"></AchievementShowCase>
          </div>
          <div v-if="lg || isListMode" class="flex-[0.4] pad:pt-20">
            <AchievementTotalContract :total="88"></AchievementTotalContract>
            <ul>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
              <AchievementContract unit="嘉鑫營造有限公司" location="苗栗縣頭份巿六合國小(後棟教室)"></AchievementContract>
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

const { breakpoint } = useApp()

const { lg } = breakpoint

const isListMode = ref(false)

const years = ref([
  { title: '2025', value: 2025 },
  { title: '2024', value: 2024 },
  { title: '2023', value: 2023 },
  { title: '2022', value: 2022 },
  { title: '2021', value: 2021 }
])

</script>

<style lang="scss" scoped>
.is-tab-active {
  @apply bg-[#E8382F];
}
</style>