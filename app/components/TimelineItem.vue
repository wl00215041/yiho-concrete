<template>
  <div class="timeline-item relative flex items-center">
    <SvgoCircle class="circle text-4xl bg-white" filled></SvgoCircle>
    <div class="line absolute inline-flex justify-center h-[123px] border border-dashed border-[#BABABA] border-1">
      <div class="circle absolute bottom-[123px] m-auto w-4 h-4 inline-block rounded-full bg-[#BABABA]"></div>
      <div class="absolute top-0 bottom-0 m-auto translate-x-1/2 ml-10">
         <div class="text-nowrap flex gap-2 items-center font-bold mb-2">
          <span class="year text-nowrap text-2xl ">{{ year }}</span>
          <span class="item-title">{{ title }}</span>
         </div>
         <div>
          <slot></slot>
         </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps({
  year: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

</script>