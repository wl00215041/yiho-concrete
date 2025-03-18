<template>
  <div
    class="relative flex flex-col pad:flex-row items-center justify-center pad:justify-between footer h-[calc(18.75rem)] px-[50px] mt-12 z-[-1] bg-[#333333] rounded-tl-[60px]">
    <div class="flex flex-col items-center">
      <SvgoFullLogo filled class="text-[221px] !h-[45px]"></SvgoFullLogo>
      <div class="text-xl text-white text-opacity-80">© 2025 YIHO Ltd. All rights reserved.</div>
    </div>
    <div class="hidden pad:block pad:flex-[0.6]">
      <FooterNav></FooterNav>
    </div>
    <SvgoDottedTexture filled class="pad:absolute pad:left-[40vw] !w-16 !h-36 rotate-90 pad:rotate-0"></SvgoDottedTexture>
    <SvgoFooterSubtract filled class="hidden pad:inline-block text-[80px] absolute right-0 top-0 -translate-y-full"></SvgoFooterSubtract>
  </div>
</template>

<style lang="scss" scoped>
.radius {
  width: 120px;
  height: 120px;
  border-radius: 124px;
  position: absolute;
  right: 4px;
  top: 0px;
  transform: rotate(-2deg);
  background: transparent;
  box-shadow: 00px 60px 0px transparent,
    30px -60px 0px #333333;
}
</style>