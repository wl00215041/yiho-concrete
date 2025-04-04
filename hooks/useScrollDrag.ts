export default (element: Ref<HTMLElement>) => {
  const isPressed = ref(false);
  const startX = ref(0);
  const scrollLeft = ref(0);

  const startDragHandler = (e: MouseEvent | TouchEvent) => {
    isPressed.value = true;
    
    // 保存初始滾動位置
    scrollLeft.value = element.value.scrollLeft;
    
    // 獲取起始位置（處理觸控和滑鼠事件）
    if (e.type === 'touchstart') {
      startX.value = (e as TouchEvent).touches[0].pageX;
    } else {
      startX.value = (e as MouseEvent).pageX;
    }
    
    // 防止默認行為，避免在某些設備上滑動時頁面也跟著滑動
    e.preventDefault();
  };
  
  const moveHandler = (e: MouseEvent | TouchEvent) => {
    if (!isPressed.value) return;
    
    // 防止默認行為
    e.preventDefault();
    
    // 計算移動距離（處理觸控和滑鼠事件）
    let currentX;
    if (e.type === 'touchmove') {
      currentX = (e as TouchEvent).touches[0].pageX;
    } else {
      currentX = (e as MouseEvent).pageX;
    }
    
    // 計算滑動距離
    const deltaX = currentX - startX.value;
    
    // 更新滾動位置
    element.value.scrollLeft = scrollLeft.value - deltaX;
  };
  
  const endDragHandler = () => {
    isPressed.value = false;
  };

  return {
    startDragHandler,
    moveHandler,
    endDragHandler,
    isPressed
  }

}