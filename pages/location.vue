<template>
  <div>
    <PageBanner image="/images/6.jpeg" title="營業據點" sub-title="Location" sub-title-color="#0075C2"></PageBanner>
    <PageSection title="來阮叨呷茶" icon-color="#0075C2">
      <div class="flex flex-col gap-6 max-w-[777px] text-[#585858] mb-14">
        <p>
          毅和小而美。而我們步步為營、一步一腳印地走了三十年。如果您還不認識我們，歡迎您來看看，呷一杯茶。雖然我們的廠房沒有華麗的裝飾，但每一處都是實實在在地用毅和產製的優良混凝土灌溉而成。請讓我們用看得見的品質，讓毅和有機會為您服務。
        </p>
      </div>
      <div class="grid grid-cols-3 gap-8 mb-14">
        <img src="/images/7.jpeg" alt="about-us" class="w-full rounded-[10px] h-[240px]" />
        <img src="/images/2.jpeg" alt="about-us" class="w-full rounded-[10px] h-[240px] object-cover" />
        <img src="/images/3.jpeg" alt="about-us" class="w-full rounded-[10px] h-[240px]" />
      </div>
      <div class="flex flex-col items-center text-center self-center gap-6 max-w-[745px] text-[#585858] mb-14">
        <p>
          毅和實業的其中一位創辦人林慶波先生三十多年前也在這樣的小巷子裡，經營著柑仔店。柑仔店裏頭那銀貨兩訖之外的人情味也被創辦人帶進毅和實業的企業文化之中。我們的服務以客戶為中心，如果你有一個夢想，需要混凝土將其構築起來，請給我們一個機會為你灌溉，我們承諾每一米都是我們的責任。
        </p>
        <div>
          <p>我們的第一個十年用心摸索、理解如何產製符合客戶期待的優良混凝土。</p>
          <p>第二個十年，我們穩定自己的步伐持續成長茁壯。</p>
          <p>第三個十年，我們用過去二十年的經驗，在新竹寶山，親自設計、建造屬於混凝土的旗艦廠房。</p>
        </div>

      </div>
    </PageSection>
    <PageSection title="廠區資訊" icon-color="#0075C2">
      <Tabs>
        <TabsTab title="港墘廠" name="harbor">
          <div class="p-4">
            <p>這是毅和實業的第一個廠房，建立於1993年，持續帶領毅和走向第三個十年。</p>
            <p>毅和港墘廠位於竹南交流道旁，我們的預拌混凝土供應，可以快速地送達新竹以及苗栗地區。</p>
          </div>
          <div class=" border border-dashed border-[#BABABA] my-5"></div>
          <div class="flex items-center px-6">
            <SvgoCapacity filled class="text-2xl mr-3"></SvgoCapacity>
            <span class="font-bold mr-4 text-[#333333]">產能</span>
            <span class="text-[#585858]">每小時可生產 60 立方米</span>
          </div>
          <div class=" border border-dashed border-[#BABABA] my-5"></div>
          <div class="flex items-center px-6 mb-6">
            <SvgoCapacity filled class="text-2xl mr-3"></SvgoCapacity>
            <span class="font-bold mr-4 text-[#333333]">地址</span>
            <span class="text-[#585858]">苗栗縣竹南鎮港墘里港仔墘3鄰29之12號</span>
          </div>
          <img src="/images/location.png" alt="location">
          <div class=" border border-dashed border-[#BABABA] my-5"></div>
          <div class="flex items-center px-6 mb-6">
            <SvgoCapacity filled class="text-2xl mr-3"></SvgoCapacity>
            <span class="font-bold mr-4 text-[#333333]">廠房照片</span>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <img class="rounded-[10px] aspect-video object-cover" src="/images/1.jpeg" alt="1" />
            <img class="rounded-[10px] aspect-video object-cover" src="/images/2.jpeg" alt="1" />
            <img class="rounded-[10px] aspect-video object-cover" src="/images/3.jpeg" alt="1" />
            <img class="rounded-[10px] aspect-video object-cover" src="/images/4.jpeg" alt="1" />
            <img class="rounded-[10px] aspect-video object-cover" src="/images/5.jpeg" alt="1" />
            <img class="rounded-[10px] aspect-video object-cover" src="/images/6.jpeg" alt="1" />
          </div>
        </TabsTab>
        <TabsTab title="大厝廠" name="main">
          <div class="p-4">
            <p>大厝廠的內容...</p>
          </div>
        </TabsTab>
        <TabsTab title="寶山科園廠" name="science">
          <div class="p-4">
            <p>寶山科園廠的內容...</p>
          </div>
        </TabsTab>
      </Tabs>
    </PageSection>
  </div>
</template>
<script setup lang="ts">
import { TabsTab } from '#components';

definePageMeta({
  layout: 'page'
})

</script>