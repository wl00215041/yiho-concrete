<template>
  <div class="annuncement">
    <div class="title">What New's</div>
    <div class="list">
      <div class="item" v-for="item in items" :key="item.id">
        <div class="date">{{ item.date }}</div>
        <div class="tag">{{ item.tag }}</div>
        <div>
          <div class="date lg:hidden">{{ item.date }}</div>
          <div class="content">{{ item.content}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const items = ref([
  {
    id: 1,
    date: '2025.02.01',
    tag: '工程實績',
    content: '實績名稱實績名稱實績名稱實績名稱',
  },
  {
    id: 2,
    date: '2025.01.24',
    tag: '品質認證',
    content: '實績名稱實績名稱實績名稱實績名稱',
  },
])

</script>

<style lang="scss" scoped>
.annuncement {
  @apply p-6 rounded-2xl relative;
  @screen pad {
    @apply bg-[#BABABA] bg-opacity-20 mb-14 mx-[1.875rem]
  }
  @screen desktop {
    @apply absolute -right-5 -bottom-0 z-10 w-[730px] h-[11.875rem] mb-0 mx-0 rounded-bl-none px-10 py-4;
    &::after {
      content: '';
      @apply absolute bottom-0 right-0 top-1 w-[750px] h-[11.875rem]  rounded-bl-[1.875rem] z-[-1];
      background-image: url('~/assets/icons/announcement-bg.svg');
    }
  }
  // position: absolute;
  // right: -20px;
  // bottom: -2px;
  // width: 720px;
  // height: 190px;
  // background-color: white;
  // z-index: 10;
  // border-top-left-radius: 1.875rem;
  // padding: .9375rem 2.5rem;

  > .title {
    @apply text-3xl mb-2 lg:mb-6 text-[#0075C2];
    @screen desktop {
      @apply text-[2rem] h-[4.25rem] mb-0 leading-[68px];
    }
  }

  &-radius {
    // position: absolute;
    // bottom: 0px;
    left: -60px;
    // transform: rotate(0deg);
  }
}

.list > .item {
  @apply flex gap-2 items-center mb-4;
}

.item > .tag {
  @apply w-[50px] h-[50px] lg:w-auto lg:h-auto bg-[#0075C2] text-white rounded-lg py-2 px-[10px] text-sm flex items-center;
  // background: #0075C2;
  // color: white;
  // padding: .25rem .75rem;
  // border-radius: .5rem;

}

</style>