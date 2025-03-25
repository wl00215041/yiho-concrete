<template>
  <div class="flex gap-4 flex-wrap">
    <ManagerGalleryCard v-for="gallery in list" :title="gallery.title"
      :image="`/files/achievements/${gallery.image}`"></ManagerGalleryCard>
  </div>
</template>
<script setup lang="ts">

type Gallery = {
  name: string;
  id: number;
  product: string;
  created_at: string;
  fk_year_id: number;
  location: string;
  images: {
    id: number;
    created_at: string;
    file: string;
    is_cover: boolean;
    fk_gallery_id: number;
  }[]
}

const props = defineProps({
  galleryList: Array as PropType<Gallery[]>,
})

const list = computed(() => {
  return props.galleryList?.map((gallery) => ({
    title: gallery.name,
    image: gallery.images.find((image) => image.is_cover)?.file
  }))
})



</script>