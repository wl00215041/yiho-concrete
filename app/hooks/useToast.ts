// useToast.ts
import { ref, onUnmounted } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  title?: string;
  duration?: number;
  closable?: boolean;
  showIcon?: boolean;
  type?: ToastType;
  onClose?: () => void;
}

export interface Toast {
  id: number;
  message: string;
  title?: string;
  type: ToastType;
  closable: boolean;
  showIcon: boolean;
  timer?: number;
}

// 创建一个全局状态来存储所有的 toast
const toasts = ref<Toast[]>([]);
let toastId = 0;

export const useToast = () => {
  const timers: number[] = [];

  // 创建一个新的 toast
  const createToast = (
    message: string,
    options: ToastOptions = {}
  ) => {
    const {
      title,
      duration = 3000,
      closable = true,
      showIcon = true,
      type = 'info',
      onClose
    } = options;

    const id = toastId++;
    
    const toast: Toast = {
      id,
      message,
      title,
      type,
      closable,
      showIcon
    };

    toasts.value.push(toast);

    if (duration > 0) {
      const timer = window.setTimeout(() => {
        removeToast(id);
        if (onClose) onClose();
      }, duration);
      
      timers.push(timer);
      toast.timer = timer;
    }

    return id;
  };

  // 移除指定 id 的 toast
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      const toast = toasts.value[index];
      if (toast.timer) {
        clearTimeout(toast.timer);
      }
      toasts.value.splice(index, 1);
    }
  };

  // 清除所有 toast
  const clearAll = () => {
    toasts.value = [];
    timers.forEach(timer => clearTimeout(timer));
  };

  // 创建不同类型的 toast 快捷方法
  const success = (message: string, options?: Omit<ToastOptions, 'type'>) => 
    createToast(message, { ...options, type: 'success' });
  
  const error = (message: string, options?: Omit<ToastOptions, 'type'>) => 
    createToast(message, { ...options, type: 'error' });
  
  const warning = (message: string, options?: Omit<ToastOptions, 'type'>) => 
    createToast(message, { ...options, type: 'warning' });
  
  const info = (message: string, options?: Omit<ToastOptions, 'type'>) => 
    createToast(message, { ...options, type: 'info' });

  // 组件卸载时清除所有定时器
  onUnmounted(() => {
    timers.forEach(timer => clearTimeout(timer));
  });

  return {
    toasts,
    createToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info
  };
};
