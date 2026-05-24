<template>
  <ManagerPage title="修改密碼">
    <div class="p-6 max-w-md">
      <form @submit.prevent="handleSubmit">
        <div class="flex flex-col mb-4">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="currentPassword">目前密碼</label>
          <input
            v-model="form.currentPassword"
            class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg"
            type="password"
            id="currentPassword"
            placeholder="請輸入目前密碼"
          />
        </div>
        <div class="flex flex-col mb-4">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="newPassword">新密碼</label>
          <input
            v-model="form.newPassword"
            class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg"
            type="password"
            id="newPassword"
            placeholder="請輸入新密碼（至少6個字元）"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label class="text-[#1C2434] font-medium mb-[10px]" for="confirmPassword">確認新密碼</label>
          <input
            v-model="form.confirmPassword"
            class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg"
            type="password"
            id="confirmPassword"
            placeholder="請再次輸入新密碼"
          />
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-500">{{ errorMessage }}</div>
        <div v-if="successMessage" class="mb-4 text-green-600">{{ successMessage }}</div>
        <button
          type="submit"
          :disabled="isLoading"
          class="py-4 bg-[#3056D3] rounded-lg text-white w-full disabled:opacity-50"
        >
          {{ isLoading ? '處理中...' : '修改密碼' }}
        </button>
      </form>
    </div>
  </ManagerPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'manager',
})

const { $trpcClient } = useNuxtApp()
const router = useRouter()

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // 驗證
  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    errorMessage.value = '請填寫所有欄位'
    return
  }

  if (form.newPassword.length < 6) {
    errorMessage.value = '新密碼至少需要6個字元'
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    errorMessage.value = '新密碼與確認密碼不相符'
    return
  }

  isLoading.value = true

  try {
    await $trpcClient.manager.changePassword.mutate({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    })

    successMessage.value = '密碼修改成功！'
    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
  } catch (error: any) {
    errorMessage.value = error?.message || '密碼修改失敗，請稍後再試'
  } finally {
    isLoading.value = false
  }
}
</script>
