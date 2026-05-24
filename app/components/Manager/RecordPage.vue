<template>
  <div class="flex h-full flex-col pad:flex-row">
    <div class="flex-[0.1] min-w-[264px] p-4 border-r border-r-[#E2E8F0] h-full">
      <slot name="sidebar"></slot>
    </div>
    <div class="flex-[0.9] h-full">
      <slot></slot>
    </div>
  </div>
</template>