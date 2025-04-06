<template>
  <div class="stepper inline-flex flex-col gap-5">
    <div class="flex items-center gap-3">
      <div class="flex justify-center items-center w-10 h-10 rounded-full bg-[#0075C2] text-white font-bold text-xl">A1
      </div>
      <div class="text-xl font-medium">原料開採<span class="text-base">（骨材、水泥、添加劑）</span></div>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex justify-center items-center w-10 h-10 rounded-full bg-[#0075C2] text-white font-bold text-xl">A2
      </div>
      <div class="text-xl font-medium">運輸<span class="text-base">（原料到混凝土廠的碳排放）</span></div>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex justify-center items-center w-10 h-10 rounded-full bg-[#0075C2] text-white font-bold text-xl">A3
      </div>
      <div class="text-xl font-medium">生產<span class="text-base">（混凝土攪拌過程的能源使用）</span></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.stepper {
  
  > div:not(:last-child) {
    @apply relative;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 20px;
      width: 2px;
      height: 100%;
      background-color: #0075C2;
      transform: translate(-50%, -50%);
    }
  }
}
</style>