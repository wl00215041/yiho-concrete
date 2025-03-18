<template>
  <div>
    <PageBanner image="/images/6.jpeg" title="產品資訊" sub-title="Products" sub-title-color="#0075C2"></PageBanner>
    <PageSection title="高強度混泥土" icon-color="#0075C2">
      <template #title="{ title }">
        <div class="flex flex-col pad:flex-row pad:items-center gap-2 pad:gap-4">
          <span>{{ title }}</span>
          <span class="text-base text-[#585858]">超越極限的承載力</span>
        </div>

      </template>
      <img src="/images/5.jpeg" class="aspect-video mb-6">
      <button class="py-3 bg-[#0075C2] rounded-[30px] text-center text-white ">聯絡窗口</button>
    </PageSection>
    
  </div>
</template>
<script setup lang="ts">
import { TabsTab } from '#components';

definePageMeta({
  layout: 'page'
})

</script>