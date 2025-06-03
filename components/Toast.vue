<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast-${toast.type}`]"
        >
          <div class="toast-icon" v-if="toast.showIcon">
            <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" class="icon">
              <path d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"></path>
            </svg>
            <svg v-else-if="toast.type === 'error'" viewBox="0 0 24 24" class="icon">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41z"></path>
            </svg>
            <svg v-else-if="toast.type === 'warning'" viewBox="0 0 24 24" class="icon">
              <path d="M12,2L1,21h22L12,2z M12,18c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,18,12,18z M11,15v-5h2v5H11z"></path>
            </svg>
            <svg v-else-if="toast.type === 'info'" viewBox="0 0 24 24" class="icon">
              <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"></path>
            </svg>
          </div>
          <div class="toast-content">
            <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>
            <div class="toast-message">{{ toast.message }}</div>
          </div>
          <button v-if="toast.closable" class="toast-close" @click="removeToast(toast.id)">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41z"></path>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from '~/hooks/useToast';

export default defineComponent({
  name: 'ToastContainer',
  setup() {
    const { toasts, removeToast } = useToast();

    return {
      toasts,
      removeToast
    };
  }
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
}

.toast {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  color: #333;
  animation: toast-in 0.3s ease-out;
}

.toast-success {
  border-left: 4px solid #52c41a;
}

.toast-error {
  border-left: 4px solid #f5222d;
}

.toast-warning {
  border-left: 4px solid #faad14;
}

.toast-info {
  border-left: 4px solid #1890ff;
}

.toast-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.icon {
  width: 20px;
  height: 20px;
}

.toast-success .icon {
  fill: #52c41a;
}

.toast-error .icon {
  fill: #f5222d;
}

.toast-warning .icon {
  fill: #faad14;
}

.toast-info .icon {
  fill: #1890ff;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.toast-message {
  font-size: 14px;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 12px;
  display: flex;
  align-items: center;
}

.toast-close .icon {
  width: 16px;
  height: 16px;
  fill: #999;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes toast-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
