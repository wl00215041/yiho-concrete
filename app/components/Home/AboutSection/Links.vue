<template>
  <div class="links">
    <HomeAboutSectionLink title="關於我們" path="/about"></HomeAboutSectionLink>
    <HomeAboutSectionLink title="營業據點" path="/location"></HomeAboutSectionLink>
    <HomeAboutSectionLink title="精英招募" path="/recruit"></HomeAboutSectionLink>
  </div>
</template>

<style lang="scss" scoped>

.links {
  display: inline-flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 27.25rem;
  // margin-bottom: 200px;
}
</style>