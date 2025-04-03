<template>
  <div class="flex gap-4 flex-wrap">
    <ManagerGalleryCard 
      v-for="gallery in list" 
      :key="gallery.id"
      :title="gallery.title"
      :image="`/files/achievements/${gallery.image}`"
      :checked="isSelected(gallery.id)"
      @onEdit="(id) => $emit('onEdit', gallery.id)"
      @update:checked="(value) => handleSelectionChange(gallery.id, value)"
    ></ManagerGalleryCard>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

type GalleryImage = {
  id: number;
  created_at: string;
  file: string;
  is_cover: boolean;
  fk_gallery_id: number;
}

type Gallery = {
  name: string;
  id: number;
  product: string;
  created_at: string;
  fk_year_id: number;
  location: string;
  images: GalleryImage[]
}

const emitOnUpdate = defineEmits(['onEdit'])

const props = defineProps({
  galleryList: Array as PropType<Gallery[]>,
})

// 使用 v-model 讓父層可以獲取選中的畫廊 ID 列表
const selectedGalleries = defineModel<number[]>('selectedGalleries', {
  default: () => []
})

// 將原始畫廊資料轉換為卡片所需格式
const list = computed(() => {
  return props.galleryList?.map((gallery) => ({
    id: gallery.id,
    title: gallery.name,
    image: gallery.images.find((image) => image.is_cover)?.file
  }))
})

// 檢查指定 ID 是否被選中
const isSelected = (id: number) => {
  return selectedGalleries.value.includes(id)
}

// 處理選擇變更
const handleSelectionChange = (id: number, isChecked: boolean) => {
  if (isChecked && !selectedGalleries.value.includes(id)) {
    // 如果選中且不存在於數組中，則添加
    selectedGalleries.value = [...selectedGalleries.value, id]
  } else if (!isChecked && selectedGalleries.value.includes(id)) {
    // 如果取消選中且存在於數組中，則移除
    selectedGalleries.value = selectedGalleries.value.filter(galleryId => galleryId !== id)
  }
}
</script>
