<template>
  <section class="section">
    <SvgoHomeAboutCorner class="absolute right-0 top-0 text-[100px] -translate-y-[calc(100%-2px)]" filled></SvgoHomeAboutCorner>
    <div class="background"></div>
    <div class="section-content">
      <div class="section-content-left">
        <!-- <div class="radius-wrapper">
          <SpecialRadius :radius="60" position="top-right" color="rgba(236, 236, 236, 0.63);"></SpecialRadius>
        </div> -->
        <h2 class="section-title">來阮叨呷茶</h2>
        <SectionSubtitle class="section-subtitle" title="從柑仔店來的混凝土專家"></SectionSubtitle>
        <div class="section-desc">
          毅和實業成立於1993年9月26日，本公司目前設有竹南港墘廠、大厝廠以及新竹寶山科園廠，持續以先進的設備，專業的技術，產製預拌混凝土，為客戶提供優質的服務。
        </div>
        <HomeAboutSectionLinks></HomeAboutSectionLinks>
      </div>
      <div class="section-content-right">
        <HomeAboutSectionShowCase></HomeAboutSectionShowCase>
      </div>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>
.section {
  @apply relative bg-[#ececec] rounded-tl-[3.75rem] rounded-br-[3.75rem];
}

.section-title {
  @apply relative text-lg font-bold pad:text-2xl mb-4;
}

.section-content {
  @apply relative z-50 flex gap-6 flex-col lg:flex-row justify-between;


}

.section-content-left, .section-content-right {
  @apply flex-1;
}

.section-content-left {
  @apply flex-1 px-[2.8125rem] py-8 pad:py-[5rem];
}

.section-content-right {
  @apply flex-1 pl-6 pb-10;

  @screen pad {
    @apply pl-0 pb-0;
  }
}

.section-desc {
  @apply relative text-xl mb-9 text-[#585858];
  max-width: 657px;
}

.background {
  @apply absolute top-0 left-0 bottom-0 right-0 overflow-hidden;
  z-index: 1;
  /* 設置為比 section-content 的 z-index 低的值 */

  &::before,
  &::after {
    content: '';
    @apply absolute w-[23.625rem] h-[23.625rem] bg-[url(~/assets/icons/bg-circle.svg)];
    @screen pad {
      @apply w-[37.6875rem] h-[37.6875rem];
    }
    @screen pad {
      @apply w-[53rem] h-[53rem];
    }
  }

  &::before {
    @apply top-0 left-0 -translate-x-1/2 -translate-y-1/2;
    // transform: translate(-47%, -34%);
  }

  &::after {
    @apply bottom-0 left-0 -translate-x-1/2 translate-y-1/2;
    // transform: translate(-47%, 65%);
  }
}
</style>
