<template>
  <div class="flex justify-center items-center h-screen bg-[#1C2434]">
    <div class="flex flex-col pad:flex-row pad:w-3/4 desktop:w-[1125px] desktop:h-[660px] bg-white ">
      <div class="flex flex-col items-center justify-center gap-16 h-24 p-8 desktop:p-0 pad:h-full pad:w-1/2 border-r-2 border-r-[#E2E8F0]">
        <SvgoPageLogo filled :fontControlled="false" class="w-[177px]"></SvgoPageLogo>
        <SvgoAccessAccount filled :fontControlled="false" class="w-[349px] hidden pad:block"></SvgoAccessAccount>
      </div>
      <div class="pad:w-1/2 px-[70px] py-6 pad:py-[76px]">
        <div class="text-[#64748B] font-medium">歡迎回來</div>
        <h1 class="text-[32px] font-bold mb-9">登入網站後台</h1>
        <form>
          <div class="flex flex-col mb-4">
            <label class="text-[#1C2434] font-medium mb-[10px]" for="username">帳號</label>
            <input v-model="username" class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg" type="text" id="username" placeholder="請輸入帳號" />
          </div>
          <div class="flex flex-col mb-6">
            <label class="text-[#1C2434] font-medium mb-[10px]" for="password" >密碼</label>
            <input v-model="password" class="py-4 px-6 border border-[#E2E8F0] focus:border-[#3C50E0] rounded-lg" type="password" id="password" placeholder="請輸入密碼" />
          </div>
          <div v-if="isLoginFailed" class="mb-6">不正確的帳號或密碼</div>
          <button @click.prevent="login" class="py-4 bg-[#3056D3] rounded-lg text-white w-full">登入</button>
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

const { data: systemInfo, refresh } = await $trpcClient.getSystemInfo.useQuery()

if (!systemInfo.value?.init) {
  router.push('/k-manager/register')
}

const { signIn, status, data: session } = useAuth()

if (status.value === 'authenticated') {
  router.push('/k-manager/achievement/list')
}

const login = async () => {
  isLoginFailed.value = false

  try {
    const res = await signIn('credentials', {
      username: username.value,
      password: password.value,
      callbackUrl: '/k-manager/news',
      redirect: false,
    })

    if (res?.error) {
      isLoginFailed.value = true
      return
    }

    router.push('/k-manager/news')
  } catch (error) {
    isLoginFailed.value = true
  }
}


</script>