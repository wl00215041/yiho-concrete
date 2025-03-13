<template>
  <div class="special-radius" :style="{ '--radius': `${radius}px`, '--size': `${radius * 2}px`, '--color': color, ...style }"></div>
</template>
<script setup lang="ts">

const props = defineProps({
  radius: {
    type: Number,
    default: 30
  },
  position: {
    type: String as PropType<'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'>,
    default: 'top-left',
    validator: (value: string) => ['top-left', 'bottom-left', 'top-right', 'bottom-right'].includes(value)
  },
  color: {
    type: String,
    default: '#fff'
  }
})

const style = computed(() => {
  if (props.position === 'bottom-left') {
    return {
      "--bottom": 0,
      '--left': -props.radius * 2 + 'px',
      transform: 'rotate(0deg)'
    }
  }
  if (props.position === 'top-right') {
    return {
      "--top": -props.radius + 'px',
      right: 0,
      transform: 'rotate(0deg)'
    }
  }
  if (props.position === 'bottom-right') {
    return {
      "--bottom": 0,
      right: -props.radius + 'px',
    }
  }
  return {
    "--top": 0,
    left: -props.radius + 'px',
    transform: 'rotate(180deg)'
  }

})

</script>

<style lang="scss" scoped>
.special-radius {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: transparent;
  box-shadow: var(--radius) var(--radius) 0 0 var(--color);
  position: absolute;
  left: var(--left, unset);
  right: var(--right, unset);
  top: var(--top, unset);
  bottom: var(--bottom, unset);
  z-index: 10;
}
</style>