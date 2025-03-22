<template>
  <div class="flex p-6 pad:py-8 pad:px-6 desktop:py-[26px] desktop:px-11 justify-between items-center">
    <SvgoPageLogo @click="$router.push({ path: '/' })" filled class="text-[221px] !h-[45px] !mb-0 cursor-pointer"></SvgoPageLogo>
    <navbar></navbar>
  </div>
</template>