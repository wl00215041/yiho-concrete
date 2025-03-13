<template>
  <div>
    <div class="header">
      <div class="logo-container">
        <svgo-logo class="logo" filled />
      </div>
      <navbar class="navbar"></navbar>
    </div>

    <!-- <Header></Header> -->
    <div class="carousel">
      <div class="slogon">
        <h2>YIHO <span>先進設備 x 專業技術</span></h2>
        <h1>預拌混凝土專家</h1>
      </div>
      <yiho-carousel v-bind="config">
        <yiho-slide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="image" />
        </yiho-slide>

        <template #addons>
          <yiho-navigation />
        </template>
      </yiho-carousel>
      <div class="annuncement">
        <SpecialRadius class="annuncement-radius" position="bottom-left"></SpecialRadius>
        <div class="title">What New's</div>
        <div class="list">
          <div class="item">
            <div class="date">2025.02.01</div>
            <div class="tag">工程實績</div>
            <div class="content">實績名稱實績名稱實績名稱實績名稱</div>
          </div>
          <div class="item">
            <div class="date">2025.01.24</div>
            <div class="tag">品質認證</div>
            <div class="content">實績名稱實績名稱實績名稱實績名稱</div>
          </div>
        </div>
      </div>
    </div>
    <HomeSectionOne class="mb-8"></HomeSectionOne>
    <HomeSectionTwo class="mb-8"></HomeSectionTwo>
    <HomeSectionThree></HomeSectionThree>
    <!-- <AppAlert>
      
    </AppAlert> -->
  </div>
</template>
<script setup lang="ts">
const images = [
  {
    id: 1,
    url: `/images/1.jpeg`,
  },
  {
    id: 2,
    url: `/images/2.jpeg`,
  },
  {
    id: 3,
    url: `/images/3.jpeg`,
  },
]

const config = {
  height: 600,
  itemsToShow: 2.5,
  gap: 24,
  snapAlign: 'center-even',
  // autoplay: 4000,
  // wrapAround: true,
  pauseAutoplayOnHover: true,
};

</script>

<style lang="scss" scoped>
.logo-container {
  @apply absolute z-10 left-11 top-7;
  @apply pb-6 pr-6 rounded-br-[30px];
  @apply bg-white;
}

.header {
  @apply flex justify-end items-center;
}

.logo {
  width: 11.25rem;
  height: 7.9375rem;
}

.navbar {
  margin-top: 20px;
  margin-bottom: 28px;
}

.carousel {
  // margin-top: 2.1875rem;
  @apply relative -mr-5 mb-[6.25rem];
  &::before {
    content: '';
    @apply absolute top-[3.75rem] z-10 w-[3.75rem] h-[3.75rem] rounded-full rotate-180;
    @apply bg-transparent;
    box-shadow: 30px 30px 0 0 #fff;
  }
}

.slogon {
  @apply absolute pointer-events-none z-10 bottom-32 left-10 ;
  @apply text-6xl text-white;
  > h2 {
    @apply flex font-normal text-6xl items-center gap-5 z-20;
    font-family: "Outfit";
    letter-spacing: 8px;
    > span {
      @apply text-3xl;
      letter-spacing: normal;
    }
  }

  > h1 {
    font-size: 60px;
    font-weight: 500;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: calc(-18.3125rem / 2 - 3.5rem);
    background-color: #E8382FCC;
    height: 18.3125rem;
    width: 18.3125rem;
    border-radius: 50%;
    z-index: -1;
  }
}

.annuncement {
  position: absolute;
  right: -20px;
  bottom: -2px;
  width: 720px;
  height: 190px;
  background-color: white;
  z-index: 10;
  border-top-left-radius: 1.875rem;
  padding: .9375rem 2.5rem;

  > .title {
    color: #0075C2;
    font-size: 2rem;

    line-height: 68px;
  }

  &-radius {
    // position: absolute;
    // bottom: 0px;
    left: -60px;
    // transform: rotate(0deg);
  }
}

.list > .item {
   display: flex;
   gap: 1.5rem;
   align-items: center;
   margin-bottom: .75rem;
}

.item > .tag {
  background: #0075C2;
  color: white;
  padding: .25rem .75rem;
  border-radius: .5rem;

}



</style>