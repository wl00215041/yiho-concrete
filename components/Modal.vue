<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        :class="{ 'bg-black bg-opacity-50': overlay }"
        @click="closeOnOverlayClick ? $emit('update:modelValue', false) : null"
      >
        <div class="flex min-h-screen items-center justify-center p-4">
          <div
            class="relative rounded-lg shadow-xl bg-[#EFF4FA]"
            :class="[
              sizeClasses,
              borderClasses,
              { 'overflow-hidden': !overflowVisible }
            ]"
            @click.stop
          >
            <!-- Header -->
            <button
                v-if="showCloseButton"
                @click="$emit('update:modelValue', false)"
                class="absolute right-3 top-3 rounded-md p-1 hover:bg-gray-200 focus:outline-none"
                :class="closeButtonClasses"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            <div
              v-if="showHeader"
              class="flex items-center justify-between px-10 pt-10 pb-3"
              :class="headerClasses"
            >
              <h3 class="text-lg font-medium" :class="titleClasses">
                {{ title }}
              </h3>

            </div>

            <!-- Body -->
            <div
              class="px-10 mb-8"
              :class="[bodyClasses, { 'max-h-[60vh] overflow-y-auto': maxHeight }]"
            >
              <slot></slot>
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="border-t p-4"
              :class="footerClasses"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  // 控制 modal 是否顯示
  modelValue: {
    type: Boolean,
    required: true
  },
  // modal 標題
  title: {
    type: String,
    default: '對話框'
  },
  // 是否顯示標題區域
  showHeader: {
    type: Boolean,
    default: true
  },
  // 是否顯示關閉按鈕
  showCloseButton: {
    type: Boolean,
    default: true
  },
  // 點擊遮罩層是否關閉 modal
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  },
  // 是否顯示遮罩層
  overlay: {
    type: Boolean,
    default: true
  },
  // modal 尺寸: 'sm', 'md', 'lg', 'xl', '2xl', 'full'
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(value)
  },
  // 是否限制最大高度
  maxHeight: {
    type: Boolean,
    default: true
  },
  // 是否允許內容溢出
  overflowVisible: {
    type: Boolean,
    default: false
  },
  // 背景顏色
  bgColor: {
    type: String,
    default: 'white'
  },
  // 是否顯示邊框
  showBorder: {
    type: Boolean,
    default: true
  },
  // 邊框顏色
  borderColor: {
    type: String,
    default: 'gray-200'
  },
  // 標題文字顏色
  titleColor: {
    type: String,
    default: 'gray-900'
  },
  // 自定義 header 樣式
  headerClasses: {
    type: String,
    default: ''
  },
  // 自定義 body 樣式
  bodyClasses: {
    type: String,
    default: ''
  },
  // 自定義 footer 樣式
  footerClasses: {
    type: String,
    default: ''
  },
  // 自定義關閉按鈕樣式
  closeButtonClasses: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'open', 'close']);

// 監聽 modal 狀態變化
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    emit('open');
    // 防止背景滾動
    document.body.style.overflow = 'hidden';
  } else {
    emit('close');
    // 恢復背景滾動
    document.body.style.overflow = '';
  }
});

// 根據 size prop 計算尺寸類名
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-full max-w-sm';
    case 'md':
      return 'w-full max-w-md';
    case 'lg':
      return 'w-full max-w-lg';
    case 'xl':
      return 'w-full max-w-xl';
    case '2xl':
      return 'w-full max-w-2xl';
    case 'full':
      return 'w-full h-full m-0';
    default:
      return 'w-full max-w-md';
  }
});

// 計算邊框類名
const borderClasses = computed(() => {
  return props.showBorder ? `border border-${props.borderColor}` : '';
});

// 計算標題類名
const titleClasses = computed(() => {
  return `text-${props.titleColor}`;
});
</script>