<template>
  <div
    class="relative overflow-hidden pt-16 pad:pt-0 flex flex-col pad:flex-row items-center justify-center pad:justify-between footer h-[278px] pad:h-[407px] desktop:h-[299px] px-[50px] mt-12 bg-[#333333] rounded-tl-[60px]">
    <div class="flex flex-col items-center">
      <SvgoFullLogo filled class="text-[221px] !h-[45px]"></SvgoFullLogo>
      <div class="text-xl text-white text-opacity-80">© 2025 YIHO Ltd. All rights reserved.</div>
    </div>
    <div class="hidden pad:block pad:flex-[0.6]">
      <FooterNavbar></FooterNavbar>
    </div>
    <SvgoDottedTexture filled class="pad:absolute pad:left-[40vw] !w-16 !h-36 rotate-90 pad:rotate-0"></SvgoDottedTexture>
    <SvgoFooterSubtract filled class="hidden pad:inline-block text-[80px] absolute right-0 top-0 -translate-y-full"></SvgoFooterSubtract>
    <SvgoFooterNavBg class="absolute left-0 top-0 w-[500px] rotate-[165deg] -translate-x-1/4 translate-y-[24px]" filled :fontControlled="false"></SvgoFooterNavBg>
    <SvgoFooterNavBg class="absolute bottom-0 invisible pad:visible right-0 w-[500px] rotate-[165deg] pad:rotate-0 -translate-x-1/3 pad:translate-x-0 pad:w-[640px]" filled :fontControlled="false"></SvgoFooterNavBg>
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