<template>
  <img 
    :src="src" 
    :alt="alt" 
    :title="title || alt"
    :loading="loading"
    :width="width"
    :height="height"
    :class="imageClass"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup lang="ts">
interface SeoImageProps {
  src: string
  alt: string
  title?: string
  loading?: 'lazy' | 'eager'
  width?: number | string
  height?: number | string
  class?: string
}

const props = withDefaults(defineProps<SeoImageProps>(), {
  loading: 'lazy',
  title: undefined,
  width: undefined,
  height: undefined,
  class: ''
})

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
}>()

const imageClass = computed(() => props.class)

const onLoad = (event: Event) => {
  emit('load', event)
}

const onError = (event: Event) => {
  emit('error', event)
  console.warn(`Failed to load image: ${props.src}`)
}

// 為圖片添加結構化資料
const imageStructuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": props.src.startsWith('http') ? props.src : `https://yiho-concrete.com.tw${props.src}`,
  "description": props.alt,
  "name": props.title || props.alt,
  ...(props.width && { "width": props.width }),
  ...(props.height && { "height": props.height })
}))


if (props.src.includes('banner') || props.src.includes('logo') || props.src.includes('about')) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(imageStructuredData.value)
      }
    ]
  })
}
</script>