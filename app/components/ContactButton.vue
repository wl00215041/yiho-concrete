<template>
  <a class="py-3 text-xl rounded-[30px] text-center text-white w-[250px] " :href="href" :class="{ 'bg-[#E8382F]': type === 'mail', 'bg-[#0075C2]': type === 'phone' }">
    <SvgoMail v-if="type === 'mail'" filled class="text-[22px] inline-block mr-2"></SvgoMail>
    <SvgoPhone v-else filled class="text-[22px] inline-block mr-2"></SvgoPhone>
    <span><slot>{{ text }}</slot></span>
  </a>
</template>
<script setup lang="ts">
defineProps({
  type: {
    type: String as PropType<'mail' | 'phone'>,
    default: 'mail',
    validator: (value: string) => {
      return ['mail', 'phone'].includes(value)
    }
  },
  text: {
    type: String,
    default: '聯繫業務窗口'
  },
  href: {
    type: String,
    default: '#'
  }

})
</script>