export default (element: Ref<HTMLElement>) => {
  const isPressed = ref(false);
  const startX = ref(0);
  const scrollLeft = ref(0);
  const velocity = ref(0);
  const lastX = ref(0);
  const lastTimestamp = ref(0);
  const animationFrame = ref<number | null>(null);
  const moveDistance = ref(0);
  const startTime = ref(0);

  const startDragHandler = (e: MouseEvent | TouchEvent) => {
    isPressed.value = true;
    moveDistance.value = 0;   // 重置移動距離
    startTime.value = Date.now(); // 記錄開始時間
    
    // 保存初始滾動位置
    scrollLeft.value = element.value.scrollLeft;
    
    // 獲取起始位置（處理觸控和滑鼠事件）
    if (e.type === 'touchstart') {
      startX.value = (e as TouchEvent).touches[0].pageX;
    } else {
      startX.value = (e as MouseEvent).pageX;
    }
    
    // 初始化速度和時間戳
    velocity.value = 0;
    lastX.value = startX.value;
    lastTimestamp.value = Date.now();
    
    // 如果有正在進行的動畫，取消它
    if (animationFrame.value !== null) {
      cancelAnimationFrame(animationFrame.value);
      animationFrame.value = null;
    }
  };
  
  const moveHandler = (e: MouseEvent | TouchEvent) => {
    if (!isPressed.value) return;
    
    // 計算移動距離（處理觸控和滑鼠事件）
    let currentX;
    if (e.type === 'touchmove') {
      currentX = (e as TouchEvent).touches[0].pageX;
    } else {
      currentX = (e as MouseEvent).pageX;
    }
    
    // 計算滑動距離
    const deltaX = currentX - startX.value;
    moveDistance.value = Math.abs(deltaX); // 記錄總移動距離的絕對值
    
    // 只有當確實是滑動意圖時才阻止默認行為
    if (moveDistance.value > 10) {
      e.preventDefault();
      
      // 更新滾動位置
      element.value.scrollLeft = scrollLeft.value - deltaX;
      
      // 計算速度 (像素/毫秒)
      const now = Date.now();
      const elapsed = now - lastTimestamp.value;
      
      if (elapsed > 0) {
        // 計算當前速度
        velocity.value = (currentX - lastX.value) / elapsed;
        
        // 更新最後位置和時間戳
        lastX.value = currentX;
        lastTimestamp.value = now;
      }
    }
  };
  
  const endDragHandler = (e: MouseEvent | TouchEvent) => {
    if (!isPressed.value) return;
    
    isPressed.value = false;
    const endTime = Date.now();
    const dragDuration = endTime - startTime.value;
    
    // 判斷是否為滑動操作
    const isSignificantMove = moveDistance.value > 10;
    const isQuickFlick = dragDuration < 300 && Math.abs(velocity.value) > 0.1;
    
    // 如果是明顯的滑動操作
    if (isSignificantMove) {
      // 在點擊事件發生前阻止它
      if (e.type.includes('mouse')) {
        const target = e.target as HTMLElement;
        const clickHandler = (clickEvent: Event) => {
          clickEvent.stopPropagation();
          clickEvent.preventDefault();
          target.removeEventListener('click', clickHandler, true);
        };
        
        // 只阻止緊跟著的點擊事件
        target.addEventListener('click', clickHandler, true);
        setTimeout(() => {
          target.removeEventListener('click', clickHandler, true);
        }, 100);
      }
      
      // 如果有足夠的速度，開始慣性滾動
      if (Math.abs(velocity.value) > 0.1) {
        startMomentumScroll();
      }
    }
  };
  
  const startMomentumScroll = () => {
    // 初始速度 (轉換為像素/幀)
    let currentVelocity = velocity.value * 16; // 假設 60fps，約 16ms/幀
    const friction = 0.95; // 摩擦係數，可調整
    
    const animate = () => {
      // 如果速度很小或用戶重新觸摸，停止動畫
      if (Math.abs(currentVelocity) < 0.5 || isPressed.value) {
        animationFrame.value = null;
        return;
      }
      
      // 應用摩擦力減速
      currentVelocity *= friction;
      
      // 更新滾動位置
      element.value.scrollLeft -= currentVelocity;
      
      // 繼續動畫
      animationFrame.value = requestAnimationFrame(animate);
    };
    
    // 開始動畫
    animationFrame.value = requestAnimationFrame(animate);
  };

  // 清理函數，確保組件卸載時取消動畫
  const cleanup = () => {
    if (animationFrame.value !== null) {
      cancelAnimationFrame(animationFrame.value);
    }
  };

  return {
    startDragHandler,
    moveHandler,
    endDragHandler,
    isPressed,
    cleanup,
    // 提供一個方法讓外部判斷是否為有效點擊
    isValidClick: () => moveDistance.value < 10
  }
}
