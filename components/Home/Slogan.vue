<template>
  <div class="slogon">
    <h2>YIHO <span>先進設備 x 專業技術</span></h2>
    <h1>預拌混凝土專家</h1>
  </div>
</template>
<style lang="scss" scoped>
.slogon {
  // @apply hidden
  // @apply absolute bottom-32 left-10;
  @apply  pointer-events-none z-20 ;
  @apply hidden lg:block text-6xl text-white;

  >h2 {
    @apply flex font-normal text-6xl items-center gap-5 z-30;
    font-family: "Outfit";
    letter-spacing: 8px;

    >span {
      @apply text-3xl;
      letter-spacing: normal;
    }
  }

  >h1 {
    font-size: 60px;
    font-weight: 500;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: calc(-18.3125rem / 2 - 3.5rem);
    background-color: #E8382FCC;
    height: 18.3125rem;
    width: 18.3125rem;
    border-radius: 50%;
    z-index: -1;
  }
}
</style>