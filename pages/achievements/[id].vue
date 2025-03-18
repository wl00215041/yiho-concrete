<template>
  <div>
    <PageBanner image="/images/6.jpeg" title="工程實績" sub-title="Achievements" sub-title-color="#E8382F"></PageBanner>
    <PageSection title="實績名稱 #1" icon-color="#E8382F">
      <AchievementContractInfo class="inline-block w-full pad:max-w-[579px] rounded-2xl mb-7" location="xxxx"
        product="xxxx" finished-date="xxxx"></AchievementContractInfo>
      <yiho-carousel v-bind="config">
        <yiho-slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="image" />
        </yiho-slide>

        <template #addons>
          <yiho-navigation />
        </template>
      </yiho-carousel>

      <div class="text-center py-[60px]">

        <button @click="$router.back()" class="py-[1.125rem] text-center border w-56 border-[#BABABA]">Back</button>
      </div>
    </PageSection>

  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: 'page'
})

const images = [
  {
    id: 1,
    url: `/images/1.jpeg`,
  },
  {
    id: 2,
    url: `/images/2.jpeg`,
  },
  {
    id: 3,
    url: `/images/3.jpeg`,
  },
]

const config = {
  height: 600,
  itemsToShow: 1,
  gap: 0,
  // snapAlign: 'center-even',
  // autoplay: 4000,
  // wrapAround: true,
  pauseAutoplayOnHover: true,
};

</script>