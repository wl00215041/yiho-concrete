<template>
  <div class="pagination">
    <button 
      v-if="showPrevButton"
      class="pagination-btn prev" 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
    >
      上一頁
    </button>
    
    <div class="pagination-numbers">
      <button 
        v-if="showFirstButton" 
        class="pagination-btn" 
        :class="{ active: currentPage === 1 }"
        @click="changePage(1)"
      >
        1
      </button>
      
      <span v-if="showLeftEllipsis" class="ellipsis">...</span>
      
      <button 
        v-for="page in displayedPages" 
        :key="page" 
        class="pagination-btn" 
        :class="{ active: currentPage === page }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      
      <span v-if="showRightEllipsis" class="ellipsis">...</span>
      
      <button 
        v-if="showLastButton" 
        class="pagination-btn" 
        :class="{ active: currentPage === totalPages }"
        @click="changePage(totalPages)"
      >
        {{ totalPages }}
      </button>
    </div>
    
    <button 
      v-if="showNextButton"
      class="pagination-btn next" 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
    >
      下一頁
    </button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'Pagination',
  props: {
    showNextButton: {
      type: Boolean,
      default: false
    },
    showPrevButton: {
      type: Boolean,
      default: false
    },
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    maxDisplayedPages: {
      type: Number,
      default: 5
    },
    modelValue: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:modelValue', 'page-change'],
  setup(props, { emit }) {
    const currentPage = ref(props.modelValue);
    
    // 計算總頁數
    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / props.itemsPerPage);
    });
    
    // 監聽 modelValue 變化
    watch(() => props.modelValue, (newValue) => {
      currentPage.value = newValue;
    });
    
    // 計算要顯示的頁碼
    const displayedPages = computed(() => {
      const maxPages = props.maxDisplayedPages;
      const halfMaxPages = Math.floor(maxPages / 2);
      
      let startPage = Math.max(currentPage.value - halfMaxPages, 1);
      let endPage = Math.min(startPage + maxPages - 1, totalPages.value);
      
      // 調整起始頁，確保顯示足夠的頁碼
      if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(endPage - maxPages + 1, 1);
      }
      
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    });
    
    // 是否顯示第一頁按鈕
    const showFirstButton = computed(() => {
      return !displayedPages.value.includes(1);
    });
    
    // 是否顯示最後一頁按鈕
    const showLastButton = computed(() => {
      return !displayedPages.value.includes(totalPages.value) && totalPages.value > 1;
    });
    
    // 是否顯示左側省略號
    const showLeftEllipsis = computed(() => {
      return showFirstButton.value && displayedPages.value[0] > 2;
    });
    
    // 是否顯示右側省略號
    const showRightEllipsis = computed(() => {
      return showLastButton.value && displayedPages.value[displayedPages.value.length - 1] < totalPages.value - 1;
    });
    
    // 切換頁碼
    const changePage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      
      currentPage.value = page;
      emit('update:modelValue', page);
      emit('page-change', page);
    };
    
    return {
      currentPage,
      totalPages,
      displayedPages,
      showFirstButton,
      showLastButton,
      showLeftEllipsis,
      showRightEllipsis,
      changePage
    };
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.pagination-numbers {
  display: flex;
  align-items: center;
}

.pagination-btn {
  margin: 0 5px;
  height: 50px;
  min-width: 50px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  color: #606266;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  color: #BABABA;
  border-color: #c6e2ff;
}

.pagination-btn.active {
  background-color: #BABABA;
  color: #fff;
  border-color: #BABABA;
}

.pagination-btn:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.ellipsis {
  margin: 0 5px;
  color: #606266;
}
</style>
