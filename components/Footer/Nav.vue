<template>
  <nav class="flex justify-between">
    <FooterNavCategory v-for="link in links" :title="link.title" :items="link.items"></FooterNavCategory>
  </nav>
</template>

<script setup lang="ts">

const links = ref([
  {
    title: '關於我們',
    items: [
      {
        title: '公司簡介',
        url: '/about'
      },
      {
        title: '大事紀',
        url: '/history'
      }
    ]
  },
  {
    title: '營業據點',
    url: '/history',
    items: [
      {
        title: '港墘廠',
        url: '/gangqian'
      },
      {
        title: '大厝廠',
        url: '/dachu'
      },
      {
        title: '寶山科技園區',
        url: '/baoshan'
      }
    ]
  },
  {
    title: '工程實績',
    url: '/history',
    items: [
      {
        title: '工程實績',
        url: '/engineering'
      }
    ]
  },
  {
    title: '產品資訊',
    url: '/history',
    items: [
      {
        title: '預伴混泥土',
        url: '/concrete'
      },
      {
        title: '品質認證',
        url: '/quality'
      },
      {
        title: '產品炭足跡',
        url: '/carbon'
      }
    ]
  },
  {
    title: '精英招募',
    url: '/history',
    items: [
      {
        title: '經營理念',
        url: '/philosophy'
      },
      {
        title: '職缺資訊',
        url: '/jobs'
      },
      {
        title: '聯絡窗口',
        url: '/contact'
      }
    ]
  }
])

</script>