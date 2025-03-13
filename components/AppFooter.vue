<template>
  <div
    class="relative flex justify-between footer h-[calc(18.75rem)] pt-[calc(82px)] px-[50px] z-[-1] bg-[#333333] rounded-tl-[60px] -ml-12 -mr-11">
    <div class="radius"></div>
    <SvgoDottedTexture filled class="absolute left-[35vw] !w-16 !h-36"></SvgoDottedTexture>
    <div class="flex-1">
      <SvgoFullLogo filled class="text-[221px] !h-[45px]"></SvgoFullLogo>
      <div class="text-xl text-white text-opacity-80">© 2025 YIHO Ltd. All rights reserved.</div>
    </div>
    <div class="flex-1">
      <FooterNav></FooterNav>
    </div>
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