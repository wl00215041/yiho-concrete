<template>
  <div class="showcase">
    <div class="circle"></div>
    <div class="">
      <img src="/images/about.png" alt="first-image" class="first-image" />
      <SvgoDottedTexture class="dotted-texture-top" filled>
      </SvgoDottedTexture>
    </div>
    <!-- <div class="absolute left-0 bottom-0">
        <img src="/images/4.jpeg" alt="first-image" class="secondary-image" />
        <SvgoDottedTexture class="dotted-texture-bottom" filled></SvgoDottedTexture>
    </div> -->

  </div>
</template>

<style lang="scss" scoped>
.showcase {
  @apply max-w-[27.25rem] pad:max-w-none relative w-full flex justify-center items-center h-full pad:overflow-hidden;
  @apply py-8 pad:py-[60px] desktop:py-20;
}

.first-image {
  @apply relative z-10 w-[290px] object-fill rounded-2xl;
  @screen pad {
    @apply w-[500px];
  }
  @screen desktop {
    @apply w-[700px];
  }
}

.dotted-texture-top {
  @apply hidden absolute top-[24px] -left-[39px] w-16 h-36;
}

.dotted-texture-bottom {
  @apply hidden absolute bottom-[28px] -left-[39px] w-16 h-36;
}

.circle {
  @apply absolute right-0 top-0 w-[6.75rem] h-[6.75rem] bg-cover bg-[url(~/assets/icons/red-circle.svg)] -translate-y-1/4 pad:translate-x-1/3 pad:-translate-y-1/3;
  // @apply absolute right-0 w-[38%] h-[38%] border-[#E8382F] border-[30px] rounded-full;
  // @apply absolute transition-all w-[6.75rem] translate-x-1/3 -translate-y-1/3 h-[6.75rem] right-0 -top-[80px] z-0 pad:overflow-hidden bg-[url(~/assets/icons/red-circle.svg)] bg-no-repeat;
  
  @screen pad {
    @apply w-[29.5625rem] h-[29.5625rem];
  }
  @screen desktop {
    @apply w-[41.5625rem] h-[41.5625rem];
  }
  // &::before {
  //   content: '';
  //   @apply w-full h-full border-[1.875rem] bg-[url(~/assets/icons/half-circle.svg)] -translate-y-full pad:translate-x-1/3 pad:-translate-y-1/3 block;
  //   @screen pad {
  //     @apply bg-cover border-[3.75rem];
  //   }
  // }
}

</style>
