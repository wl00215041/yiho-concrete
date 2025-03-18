<template>
  <nav class="flex justify-between">
    <FooterNavCategory v-for="link in links" :title="link.title" :items="link.items"></FooterNavCategory>
  </nav>
</template>

<script setup lang="ts">
import useApp from '~/hooks/useApp';


const { breakpoint } = useApp()

const links = computed(() => {
  return [
    {
      title: '關於我們',
      items: [
        {
          title: '公司簡介',
          url: '/'
        },
        {
          title: '大事紀',
          url: '/'
        }
      ]
    },
    {
      title: '營業據點',
      url: '/',
      items: [
        {
          title: '港墘廠',
          url: '/'
        },
        {
          title: '大厝廠',
          url: '/'
        },
        {
          title: '寶山科技園區',
          url: '/'
        }
      ]
    },
    {
      title: '工程實績',
      url: '/',
      items: [
        {
          title: '工程實績',
          url: '/'
        }
      ]
    },
    ...(breakpoint.desktop.value ? [{
      title: '產品資訊',
      url: '/',
      items: [
        {
          title: '預伴混泥土',
          url: '/'
        },
        {
          title: '品質認證',
          url: '/'
        },
        {
          title: '產品炭足跡',
          url: '/'
        }
      ]
    },
    {
      title: '精英招募',
      url: '/',
      items: [
        {
          title: '經營理念',
          url: '/'
        },
        {
          title: '職缺資訊',
          url: '/'
        },
        {
          title: '聯絡窗口',
          url: '/'
        }
      ]
    }] : [])
  ]

})

</script>