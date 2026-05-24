<template>
  <div class="logo-container">
    <div>
      <svgo-logo class="logo" filled/>
    </div>
    <navbar></navbar>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
.logo-container {
  // width: 11.25rem;
  // height: 7.9375rem;
  background-color: white;
  border-radius: 1.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 100%;
  height: 100%;
}
</style>