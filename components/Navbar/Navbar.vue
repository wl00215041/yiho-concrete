<template>
  <nav class="navbar">
    <div class="nav-links">
      <NuxtLink class="nav-link" to="/about">關於我們</NuxtLink>
      <NuxtLink class="nav-link" to="/location">營業據點</NuxtLink>
      <NuxtLink class="nav-link" to="/achievements">工程實績</NuxtLink>
      <NuxtLink class="nav-link" to="/products">產品資訊</NuxtLink>
      <NuxtLink class="nav-link" to="/recruit">精英招募</NuxtLink>
    </div>
    <div class="socials">
      <svgo-social-facebook class="social-icon" filled></svgo-social-facebook>
      <svgo-social-line class="social-icon" filled></svgo-social-line>
    </div>
  </nav>

</template>
<style lang="scss" scoped>

.navbar {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

::v-deep(.nav-link) {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}


.socials {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
}

</style>