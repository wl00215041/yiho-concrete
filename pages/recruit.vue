<template>
  <div>
    <PageBanner image="/images/recruit-banner.png" title="菁英招募" sub-title="Recruit" sub-title-color="#E8382F">
    </PageBanner>
    <PageSection class="mb-8" title="經營理念" icon-color="#E8382F">
      <div class="text-[#333333] mb-6 pad:mb-12 desktop:mb-14">
        <p>我們相信，混凝土不只是建築材料，而是夢想的基礎</p>
        <p>每一座廠房、每一條道路、每一個家的地基，背後都是一個人的願景。</p>
        <p>我們不只是生產混凝土，而是協助每一位客戶，將夢想穩穩築起。</p>
      </div>
      <div class="flex flex-col pad:flex-row justify-between pad:px-5">
        <RecruitCard title="穩定發展">
          <template #icon>
            <SvgoGrow filled :fontControlled="false" class="w-[52px] pad:w-[70px]"></SvgoGrow>
          </template>
          三十年來，我們從竹南到新竹，逐步擴展據點，打造技術先進、品質可靠的混凝土廠房
        </RecruitCard>
        <RecruitCard title="技術創新">
          <template #icon>
            <SvgoInnovation filled :fontControlled="false" class="w-[40px] pad:w-[53px]"></SvgoInnovation>
          </template>
          我們不斷精進設備與生產工法，確保每一立方米的混凝土都符合最高標準，讓客戶用得安心 </RecruitCard>
        <RecruitCard title="人情文化">
          <template #icon>
            <SvgoCulture filled :fontControlled="false" class="w-[57px] pad:w-[75px]"></SvgoCulture>
          </template>
          這裡沒有冰冷的工廠管理，我們像家人一樣互相扶持，讓每個人都能發揮所長
        </RecruitCard>
        <RecruitCard title="永續成長">
          <template #icon>
            <SvgoEcosystem filled :fontControlled="false" class="w-[50px] pad:w-[65px]"></SvgoEcosystem>
          </template>
          從十年的探索，到三十年的旗艦廠建設，我們持續前行，打造更專業、更高品質的混凝土品牌
        </RecruitCard>
      </div>
    </PageSection>
    <PageSection title="職缺資訊" icon-color="#E8382F">
      <template #title>
        <div class="flex justify-between items-center">
          <span>職缺資訊</span>
          <ContactButton type="mail" href="mailto:yiho470208@gmail.com">聯繫負責窗口</ContactButton>
        </div>
      </template>
      <RecruitTable class="hidden pad:table"></RecruitTable>
      <RecruitList class="pad:hidden"></RecruitList>
    </PageSection>
  </div>
</template>
<script setup lang="ts">
import { TabsTab } from '#components';

definePageMeta({
  layout: 'page'
})

useHead({
  title: '精英招募'
})

</script>