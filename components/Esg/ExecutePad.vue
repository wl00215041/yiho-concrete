<template>
  <div class="hidden pad:grid grid-cols-1 pad:grid-cols-2 gap-x-[68px] gap-y-16 relative">
    <div class="w-full h-20 bg-[#0075C2] rounded-2xl text-white text-2xl flex items-center py-5 px-8">
      <SvgoCo2Cloud filled class="text-[40px] mr-6"></SvgoCo2Cloud>
      <span class="text-[1.4vw]">盤查廠內溫室氣體</span>
    </div>
    <div class="w-full h-20 bg-[#64748B] rounded-2xl text-white text-2xl flex items-center py-5 px-8">
      <SvgoArmWrestling filled class="text-[40px] mr-6"></SvgoArmWrestling>
      <span class="text-[1.4vw]">實施減碳策略</span>
    </div>
    <div class="w-full h-20 bg-[#64748B] rounded-2xl text-white text-2xl flex items-center py-5 px-8">
      <SvgoArrows filled class="text-[40px] mr-6"></SvgoArrows>
      <span class="text-[1.4vw]">追蹤產品碳足跡</span>
    </div>
    <div class="w-full h-20 bg-[#0075C2] rounded-2xl text-white text-2xl flex items-center py-5 px-8">
      <SvgoHeart filled class="text-[40px] mr-6"></SvgoHeart>
      <span class="text-[1.4vw]">推行節能優化</span>
    </div>
    <div class="absolute flex items-center top-0 bottom-0 left-[calc(100%/5)] m-auto">
      <SvgoArrowUp filled class="text-4xl rotate-180"></SvgoArrowUp>
    </div>
    <div class="absolute flex justify-center left-0 right-0 bottom-[calc(80px-20px)] m-auto">
      <SvgoArrowUp filled class="text-4xl absolute rotate-90"></SvgoArrowUp>
    </div>
    <div class="absolute flex justify-end items-center right-[calc(100%/5)] top-0 bottom-0 m-auto">
      <SvgoArrowUp filled class="text-4xl absolute"></SvgoArrowUp>
    </div>
  </div>
</template>