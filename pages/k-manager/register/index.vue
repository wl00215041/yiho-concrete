<template>
  <div class="flex justify-center items-center h-screen bg-[#1C2434]">
    <div class="flex flex-col pad:flex-row w-[1125px] h-[660px] bg-white ">
      <div class="flex flex-col items-center justify-center gap-16 h-24 pad:h-full pad:w-1/2 border-r-2 border-r-[#E2E8F0]">
        <SvgoPageLogo filled :fontControlled="false" class="w-[177px]"></SvgoPageLogo>
        <SvgoAccessAccount filled :fontControlled="false" class="w-[349px] hidden pad:block"></SvgoAccessAccount>
      </div>
      <div class="pad:w-1/2 px-[70px] py-6 pad:py-[76px]">
        <div class="text-[#64748B] font-medium">歡迎回來</div>
        <h1 class="text-[32px] font-bold mb-9">註冊初始帳號</h1>
        <form>
          <div class="flex flex-col mb-4">
            <label class="text-[#1C2434] font-medium mb-[10px]" for="username">帳號</label>
            <input v-model="username" class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg" type="text" id="username" placeholder="請輸入帳號" />
          </div>
          <div class="flex flex-col mb-6">
            <label class="text-[#1C2434] font-medium mb-[10px]" for="password" >密碼</label>
            <input v-model="password" class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg" type="password" id="password" placeholder="請輸入密碼" />
          </div>
          <button @click.prevent="register" class="py-4 bg-[#3056D3] rounded-lg text-white w-full">註冊</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login',
})
const router = useRouter()
const isLoginFailed = ref(false)

const username = ref('')
const password = ref('')

const { $trpcClient } = useNuxtApp()

const { data: systemInfo, refresh: galleryRefresh } = await $trpcClient.getSystemInfo.useQuery()

if (systemInfo.value?.init) {
  router.push('/k-manager/signin')
}

const { signIn, status } = useAuth()

if (status.value === 'authenticated') {
  router.push('/k-manager/achievement/list')
}

const register = async () => {
  isLoginFailed.value = false
  await $trpcClient.createDefaultUser.mutate({
    username: username.value,
    password: password.value,
  })
  router.push('/k-manager/signin')
}


</script>