<template>
  <div class="flex gap-4 flex-wrap">
    <ManagerGalleryCard 
      v-for="gallery in list" 
      :key="gallery.id"
      :title="gallery.title"
      :image="`/files/achievements/${gallery.image}`"
      :checked="isSelected(gallery.id)"
      :pinned="gallery.pinned"
      @onEdit="(id) => $emit('onEdit', gallery.id)"
      @onPin="(id) => $emit('onPin', gallery.id)"
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
  pinned_at: string | null;
  fk_year_id: number;
  location: string;
  images: GalleryImage[]
}

const emitOnUpdate = defineEmits(['onEdit', 'onPin'])

const props = defineProps({
  galleryList: Array as PropType<Gallery[]>,
})

const selectedGalleries = defineModel<number[]>('selectedGalleries', {
  default: () => []
})

const list = computed(() => {
  return props.galleryList?.map((gallery) => ({
    id: gallery.id,
    title: gallery.name,
    image: gallery.images.find((image) => image.is_cover)?.file,
    pinned: !!gallery.pinned_at,
  }))
})

const isSelected = (id: number) => {
  return selectedGalleries.value.includes(id)
}

const handleSelectionChange = (id: number, isChecked: boolean) => {
  if (isChecked && !selectedGalleries.value.includes(id)) {
    selectedGalleries.value = [...selectedGalleries.value, id]
  } else if (!isChecked && selectedGalleries.value.includes(id)) {
    selectedGalleries.value = selectedGalleries.value.filter(galleryId => galleryId !== id)
  }
}
</script>
