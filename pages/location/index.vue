<template>
  <div>
    <PageBanner image="/images/location-banner.png" title="營業據點" sub-title="Location" sub-title-color="#0075C2"></PageBanner>
    <PageSection title="來阮叨呷茶" icon-color="#0075C2">
      <div class="flex flex-col gap-6 max-w-[777px] text-[#585858] mb-8 pad:mb-14">
        <p>
          毅和小而美。而我們步步為營、一步一腳印地走了三十年。如果您還不認識我們，歡迎您來看看，呷一杯茶。雖然我們的廠房沒有華麗的裝飾，但每一處都是實實在在地用毅和產製的優良混凝土灌溉而成。請讓我們用看得見的品質，讓毅和有機會為您服務。
        </p>
      </div>
    </PageSection>
    <PageSection title="廠區資訊" icon-color="#0075C2">
      <Tabs>
        <LocationLocation1></LocationLocation1>
        <LocationLocation2></LocationLocation2>
        <LocationLocation3></LocationLocation3>
      </Tabs>
    </PageSection>
  </div>
</template>
<script setup lang="ts">
import { TabsTab } from '#components';

definePageMeta({
  layout: 'page'
})

useHead({
  title: '營業據點'
})

</script>