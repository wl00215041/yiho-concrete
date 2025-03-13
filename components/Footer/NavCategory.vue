<template>
  <div>
    <slot name="title" :title="title">
      <p class="text-base text-white font-medium mb-5">{{ title }}</p>
    </slot>
    <ul class="text-sm text-white text-opacity-70 flex flex-col gap-4">
      <slot name="items" :items="items">
        <li v-for="(item, index) in items" :key="index">
          <NuxtLink :to="item.url">{{ item.title }}</NuxtLink>
        </li>
      </slot>

    </ul>
  </div>
</template>

<script setup lang="ts">

type NavItem = {
  title: string
  url: string
}

defineProps({
  title: {
    type: String
  },
  items: {
    type: Array as PropType<NavItem[]>,
    default: () => []
  }
})

</script>