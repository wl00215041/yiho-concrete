<template>
  <div class="min-h-screen xl:flex">
    <ManagerSidebar />
    <ManagerBackdrop />
    <div class="flex-1 transition-all duration-300 ease-in-out h-screen bg-[#F1F5F9]"
      :class="[context.isExpanded || context.isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']">
      <!-- <app-header /> -->
      <div class="p-10  h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const context = useSidebarProvider()
// const { isExpanded, isHovered } = useSidebar();
</script>