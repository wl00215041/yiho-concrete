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
import useScrollDrag from '~/hooks/useScrollDrag';

const timeline = templateRef('timeline');

const { startDragHandler, moveHandler, endDragHandler, isPressed } = useScrollDrag(timeline)


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