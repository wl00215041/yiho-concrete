<template>
  <slot :open="open"></slot>
  <Modal v-model="isOpen" size="2xl">
    <div class="flex flex-col gap-4">
      <form @submit.prevent="handleSubmit">
        <FormField forId="name" title="工程實績" required>
          <FormInput 
            type="text" 
            id="name" 
            v-model:value="formData.name" 
            placeholder="請輸入工程實績名稱"
          />
        </FormField>
        
        <FormField forId="location" title="基地位置">
          <FormInput 
            type="text" 
            id="location" 
            v-model:value="formData.location" 
            placeholder="請輸入此工程實績的基地位置"
          />
        </FormField>
        
        <FormField forId="product" title="使用產品">
          <FormInput 
            type="text" 
            id="product" 
            v-model:value="formData.product" 
            placeholder="請輸入此工程實績的使用的產品"
          />
        </FormField>
        
        <FormField forId="finishedDate" title="完工日期">
          <FormInput 
            type="date" 
            id="finishedDate" 
            v-model:value="formData.finishedDate" 
            placeholder="請輸入完工日期"
          />
        </FormField>
        
        <FormField forId="file" title="檔案上傳" required>
          <FileUpload 
            @onSelect="handleImageSelect" 
            multiple 
            description="圖片最多可上傳10張，檔案格式限定為 .jpg, .png"
          />
          <div class="flex gap-6 flex-wrap">
            <ManagerAchievementSelectableImage 
              v-for="file in formData.existedImages" 
              :key="file"
              @click="formData.defaultName = file" 
              :selected="file === formData.defaultName"  
              :src="`/files/achievements/${file}`"
            />
            <ManagerAchievementSelectableImage 
              v-for="file in formData.files" 
              :key="file.name"
              @click="formData.defaultName = file.name" 
              :selected="file.name === formData.defaultName"  
              :src="(file as any).content"
            />
          </div>
        </FormField>
        
        <button 
          class="bg-[#3C50E0] py-3 text-[#EFF4FB] font-medium w-full rounded disabled:bg-slate-400" 
          type="submit"
        >
          新增
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import type { ClientFile } from 'nuxt-file-storage';

const { $trpcClient } = useNuxtApp();

type EmitPayload = {
  id: number;
  location: string;
  name: string;
  product: string;
  files: ClientFile[];
  defaultName: string;
  finishedDate: string;
  toDeleteImages: string[];
};

const props = defineProps({
  selectedId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits({
  onUpdate: (payload: EmitPayload) => true,
});

const isOpen = defineModel<boolean>('isOpen', { default: false });

// 使用響應式對象整合表單數據
const formData = reactive({
  name: '',
  location: '',
  product: '',
  finishedDate: '',
  files: [] as ClientFile[],
  existedImages: [] as string[],
  toDeleteImages: [] as string[],
  defaultName: '',
});

// 計算屬性獲取ID
const id = computed(() => props.selectedId);

// 獲取畫廊數據
const { data, refresh } = await $trpcClient.manager.getGalleryById.useQuery(id);

watch(id, async (newId) => {
  await refresh();
});

const fillForm = () => {
  if (data.value) {
    formData.name = data.value.name || '';
    formData.location = data.value.location || '';
    formData.product = data.value.product || '';
    formData.finishedDate = data.value.finishedDate || '';
    formData.existedImages = data.value.images?.map(image => image.file) || [];
    formData.defaultName = data.value.images?.find(image => image.is_cover)?.file || '';
  }
}

watch(data, (newData) => {
  if (newData) {
    fillForm();
  }
}, { immediate: true });

watch(isOpen, (value) => {
  if (value && id.value) {
    fillForm();
  }
}, { immediate: true });

// 打開模態框
const open = () => {
  isOpen.value = true;
};

// 處理圖片選擇
const handleImageSelect = (images: ClientFile[]) => {
  const remainingSlots = 10 - formData.files.length;
  
  if (images.length > remainingSlots) {
    formData.files.push(...images.slice(0, remainingSlots));
    alert('最多只能上傳10張圖片');
  } else {
    formData.files.push(...images);
  }
  
  // 如果沒有默認圖片且有上傳圖片，設置第一張為默認
  if (formData.files.length > 0 && !formData.defaultName) {
    formData.defaultName = formData.files[0].name;
  }
};

// 提交表單
const handleSubmit = () => {
  emit('onUpdate', {
    id: id.value,
    name: formData.name,
    location: formData.location,
    product: formData.product,
    files: formData.files,
    defaultName: formData.defaultName,
    finishedDate: formData.finishedDate,
    toDeleteImages: formData.toDeleteImages,
  });
};

// 重置表單
const resetForm = () => {
  formData.name = '';
  formData.location = '';
  formData.product = '';
  formData.finishedDate = '';
  formData.files = [];
  formData.existedImages = [];
  formData.toDeleteImages = [];
  formData.defaultName = '';
};

// 監聽模態框關閉時重置表單
watch(isOpen, (value) => {
  if (!value) {
    resetForm();
  }
});
</script>
