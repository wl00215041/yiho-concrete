<template>
  <section class="section">
    <div class="background"></div>
    <div class="background-1"></div>
    <div class="section-content">
      <div class="section-contnet-left">
        <div class="radius-wrapper">
          <SpecialRadius :radius="60" position="top-right" color="rgba(236, 236, 236, 0.63);"></SpecialRadius>
        </div>
        <h2 class="section-title">來阮叨呷茶</h2>
        <SectionSubtitle class="section-subtitle" title="從柑仔店來的混凝土專家"></SectionSubtitle>
        <div class="section-desc">
          毅和實業成立於1993年9月26日，本公司目前設有竹南港墘廠、大厝廠以及新竹寶山科園廠，持續以先進的設備，專業的技術，產製預拌混凝土，為客戶提供優質的服務。
        </div>
        <HomeSectionTwoLinks></HomeSectionTwoLinks>
      </div>
      <div class="section-contnet-right">
        <HomeSectionTwoShowCase></HomeSectionTwoShowCase>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  @apply relative bg-[#ececec] px-[2.8125rem] py-[5rem] rounded-tl-[3.75rem] rounded-br-[3.75rem] -ml-11 -mr-11;
}

.section-title {
  @apply relative text-2xl mb-4;
}

.section-content {
  @apply relative z-50 flex justify-between;
}

.section-desc {
  @apply relative text-xl mb-9;
  max-width: 657px;
}

.background {
  @apply absolute top-0 left-0 bottom-0 right-0 overflow-hidden;
  z-index: 1;
  /* 設置為比 section-content 的 z-index 低的值 */

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 52.5rem;
    height: 52.5rem;
    border: 10rem solid #BABABA;
    border-radius: 50%;
  }

  &::before {
    transform: translate(-47%, -34%);
  }

  &::after {
    transform: translate(-47%, 65%);
  }
}

.background-1 {
  @apply absolute top-0 left-0 bottom-0 right-0 overflow-hidden;
  z-index: 1;
  /* 設置為比 section-content 的 z-index 低的值 */

  &::before {
    content: '';
    position: absolute;
    width: 41.5625rem;
    height: 41.5625rem;
    border: 10rem solid #E8382F;
    border-radius: 50%;
    right: calc( -32rem / 2 );
    top: calc( -32rem / 2 );
  }

  // &::before {
  //   transform: translate(-47%, -34%);
  // }

}

.radius-wrapper {
  @apply absolute -top-[3.75rem] right-0 overflow-hidden w-[7.5rem] h-[7.5rem] rotate-0;
  z-index: 60;
  /* 確保它在 background 之上 */
}
</style>
