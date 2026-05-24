<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg mx-4 w-[570px] h-[358px] overflow-hidden flex flex-col items-center justify-center">
        <!-- 標題區域 -->
        <div class="flex justify-center items-center mb-8">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <slot name="icon">
              <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </slot>
          </div>
        </div>
        
        <!-- 標題文字 -->
        <div class="text-center px-4 mb-6">
          <h3 class="text-xl font-bold text-gray-900">
            <slot name="title">{{ title }}</slot>
          </h3>
        </div>
        
        <!-- 內容區域 -->
        <div class="text-center px-4 py-3 mb-8">
          <p class="text-sm text-[#585858]">
            <slot>{{ message }}</slot>
          </p>
        </div>
        
        <!-- 按鈕區域 -->
        <div class="flex justify-center gap-[18px]">
          <button 
            @click="onCancel" 
            class="py-3 px-4 min-w-[190px] text-[#585858] focus:outline-none bg-[#EFF4FA] border border-[#BABABA] rounded-[4px]"
            :class="cancelButtonClass"
          >
            {{ cancelText }}
          </button>
          <button 
            @click="onConfirm" 
            class="py-3 px-4 min-w-[190px] focus:outline-none text-[#EFF4FB] rounded-[4px]"
            :class="confirmButtonClass"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '系統訊息'
    },
    message: {
      type: String,
      default: '請確認是否要刪除已勾選的資料'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '刪除'
    },
    cancelButtonClass: {
      type: String,
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    },
    confirmButtonClass: {
      type: String,
      default: 'bg-red-500 hover:bg-red-600'
    }
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const onConfirm = () => {
      emit('confirm');
      emit('update:modelValue', false);
    };
    
    const onCancel = () => {
      emit('cancel');
      emit('update:modelValue', false);
    };
    
    return {
      onConfirm,
      onCancel
    };
  }
}
</script>
