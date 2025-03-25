<template>
  <div class="flex justify-between">
    <ClientOnly>
      <FooterNavCategory v-for="link in links" :title="link.title" :items="link.items"></FooterNavCategory>
    </ClientOnly>
  </div>
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
          url: '/about'
        },
        {
          title: '大事紀',
          url: '/about'
        }
      ]
    },
    {
      title: '營業據點',
      url: '/location',
      items: [
        {
          title: '港墘廠',
          url: '/location'
        },
        {
          title: '大厝廠',
          url: '/location'
        },
        {
          title: '寶山科技園區',
          url: '/location'
        }
      ]
    },
    {
      title: '工程實績',
      url: '/achievements',
      items: [
        {
          title: '工程實績',
          url: '/achievements'
        }
      ]
    },
    ...(breakpoint.desktop.value ? [{
      title: '產品資訊',
      url: '/products',
      items: [
        {
          title: '預伴混泥土',
          url: '/products'
        },
        {
          title: '品質認證',
          url: '/products'
        },
        {
          title: '產品炭足跡',
          url: '/products'
        }
      ]
    },
    {
      title: '精英招募',
      url: '/recruit',
      items: [
        {
          title: '經營理念',
          url: '/recruit'
        },
        {
          title: '職缺資訊',
          url: '/recruit'
        },
        {
          title: '聯絡窗口',
          url: '/recruit'
        }
      ]
    }] : [])
  ]

})

</script>