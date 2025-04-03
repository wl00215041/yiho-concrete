<template>
  <div id="timeline" ref="timeline" class="flex py-20 h-[364px]" :class="{ 'select-none': isPressed }" 
    @mousedown="startDragHandler" 
    @touchstart="startDragHandler" 
    @mousemove="moveHandler"
    @touchmove="moveHandler"
    @mouseup="endDragHandler" 
    @mouseleave="endDragHandler"
    @touchend="endDragHandler"
    @touchcancel="endDragHandler">
    <div class="flex-1 relative flex items-center">
      <div class="track absolute w-full top-0 bottom-0 m-auto"></div>
      <div class="timeline-items flex items-center gap-[162px] top-0 bottom-0 m-auto pl-6 pad:pl-[30px] desktop:pl-[107px]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isPressed = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const timeline = templateRef('timeline');

const startDragHandler = (e: MouseEvent | TouchEvent) => {
  isPressed.value = true;
  
  // 保存初始滾動位置
  scrollLeft.value = timeline.value.scrollLeft;
  
  // 獲取起始位置（處理觸控和滑鼠事件）
  if (e.type === 'touchstart') {
    startX.value = (e as TouchEvent).touches[0].pageX;
  } else {
    startX.value = (e as MouseEvent).pageX;
  }
  
  // 防止默認行為，避免在某些設備上滑動時頁面也跟著滑動
  e.preventDefault();
};

const moveHandler = (e: MouseEvent | TouchEvent) => {
  if (!isPressed.value) return;
  
  // 防止默認行為
  e.preventDefault();
  
  // 計算移動距離（處理觸控和滑鼠事件）
  let currentX;
  if (e.type === 'touchmove') {
    currentX = (e as TouchEvent).touches[0].pageX;
  } else {
    currentX = (e as MouseEvent).pageX;
  }
  
  // 計算滑動距離
  const deltaX = currentX - startX.value;
  
  // 更新滾動位置
  timeline.value.scrollLeft = scrollLeft.value - deltaX;
};

const endDragHandler = () => {
  isPressed.value = false;
};
</script>

<style lang="scss" scoped>
.track {
  height: 0.25rem;
  background-color: #BABABA;
}

:deep(.timeline-item:nth-child(odd)) {
  .circle {
    color: #E8382F
  }
  .line {
    top: calc(-107px - 16px);
    left: 50%;
  }

  .year {
    color: #E8382F;
  }
}

:deep(.timeline-item:nth-child(even)) {
  .circle {
    color: #0075C2
  }
  .line {
    top: calc(107px / 2 - 16px);
    left: 50%;
    > .circle {
      bottom: -8px;
    }
  }
  .year {
    color: #0075C2;
  }
}
</style>