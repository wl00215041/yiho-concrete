<template>
<div>

</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})
const router = useRouter()


const { signOut } = useAuth()

const handleSignOut = async () => {
  await signOut({
    redirect: false
  })
  router.push('/k-manager/signin')
}

handleSignOut()

</script>