import { PrismaClient } from '@prisma/client'
import { publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { get } from '@vueuse/core';
const products = [
  {
    id: 1,
    title: "普通混凝土",
    imageUrl: '/images/5.jpeg',
    description: "穩固基礎，百搭之選\n\n結構穩固、應用廣泛，是各類工程最可靠的基本材料，打造安全耐用的建築結構",
    features: [
      "密度低（800 - 1800 kg/m³），減輕結構負荷",
      "一般常見於280 kgf/cm2 ~ 420 kgf/cm2",
      "優異隔熱性能，提高建築節能效果",
      "高流動性，易於施工，適用於輕質填充應用",
      "耐火防火，提高建築安全性"
    ],
    applications: [
      "一般土木建築工程之一般建築結構，如地基、牆體、梁柱等"
    ],
    specifications: [
      { name: "密度", value: "800 - 1800 kg/m³" },
      { name: "抗壓強度", value: "" },
      { name: "導熱係數", value: "" }
    ]
  },
  {
    id: 2,
    title: "高強度混凝土",
    imageUrl: '/images/5.jpeg',
    description: "超越極限的承載力\n\n專為高層建築、橋樑與重載結構設計，提供卓越的抗壓性能與耐久性",
    features: [
      "抗壓強度通常遠超過普通混凝土",
      "抗壓強度高約420kgf/cm²以上，即可視為高強度混凝土",
      "通常採用較低的水灰比，以提高強度和耐久性"
    ],
    applications: [
      "用於高層建築、橋梁等需要高承載能力的結構"
    ],
    specifications: [
      { name: "密度", value: "800 - 1800 kg/m³" },
      { name: "抗壓強度", value: "15 - 40 MPa" },
      { name: "導熱係數", value: "0.1 - 0.4 W/mK" }
    ]
  },
  {
    id: 3,
    title: "自充填混凝土",
    imageUrl: '/images/5.jpeg',
    description: "施工無憂，品質穩定\n\n高流動性、優異抗離析性，適用於高密度鋼筋結構，提升施工品質",
    features: [
      "使用較高比例之再生材料",
      "高流動性且高均勻性",
      "易於施工，可減少施工時間和人力成本",
      "密實的結構提高了混凝土的抗滲性和耐久性"
    ],
    applications: [
      "適用於複雜結構且無需振動，減少施工噪音",
      "適用於鋼筋密集的結構：如橋梁、隧道、高層建築、預製構件",
      "地下室、醫院等"
    ],
    specifications: [
      { name: "密度", value: "" },
      { name: "抗壓強度", value: "" },
      { name: "導熱係數", value: "" }
    ]
  },
  {
    id: 4,
    title: "水中混凝土",
    imageUrl: '/images/5.jpeg',
    description: "抵禦水流，穩固基礎\n\n專為水下環境設計，確保混凝土在水中澆築時不離析、不流失，達到穩定成型",
    features: [
      "水中混凝土是指在水下進行澆築和硬化的混凝土，它與普通的陸上混凝土在配比、施工方法和材料選擇上都有所不同，以適應水下環境的特殊要求",
      "具有抗分散性",
      "流動性及耐久性及黏滯性"
    ],
    applications: [
      "用於水下基礎工程、水壩和水庫擋水結構、海洋結構、橋梁墩基等項目"
    ],
    specifications: [
      { name: "密度", value: "" },
      { name: "抗壓強度", value: "" },
      { name: "導熱係數", value: "" }
    ]
  },
  {
    id: 5,
    title: "抗彎混凝土",
    imageUrl: '/images/5.jpeg',
    description: "強韌結構，承受變形\n\n擁有優異的抗彎強度，專為承受動態負載、抗震與結構變形而設計",
    features: [
      "經由特殊之配比設計",
      "強調的是混凝土材料抵抗彎曲應力的能力，不僅要承受垂直的壓力，還要承受水平的彎曲力及較高之瞬間耐衝擊性"
    ],
    applications: [
      "於機場跑道、軍方戰備道路及快速及 高速公路部分剛性路面等特殊鋪面工程"
    ],
    specifications: [
      { name: "密度", value: "" },
      { name: "抗壓強度", value: "" },
      { name: "導熱係數", value: "" }
    ]
  },
  {
    id: 6,
    title: "巨積混凝土",
    imageUrl: '/images/5.jpeg',
    description: "精準控溫，確保結構穩定\n\n專為大體積結構開發，控制水化熱，減少溫差裂縫，提升施工品質",
    features: [
      "大體積混凝土澆置後，因水泥水化作用產生的熱量不易散失，導致混凝土內部溫升過高，考慮其自體水化熱溫度及體積變化",
      "巨積混凝土的養護非常的重要，需要維持一定的濕度與溫度，以避免造成不必要的裂縫產生",
      "巨積混凝土的施工是一項複雜的工程，需要專業的技術和經驗"
    ],
    applications: [
      "大型橋墩及建築基礎、機台基座、壩體工程及核電廠等"
    ],
    specifications: [
      { name: "密度", value: "" },
      { name: "抗壓強度", value: "" },
      { name: "導熱係數", value: "" }
    ]
  },
  {
    id: 7,
    title: "客製化混凝土",
    imageUrl: '/images/5.jpeg',
    description: "量身打造，滿足獨特需求\n\n依據您的設計、環境條件與功能需求，確保每一立方米都符合您的預期",
    features: [
      "根據特定工程的需求，對混凝土的配比、材料和性能進行調整和設計，以達到最佳的工程效果"
    ],
    applications: [
      "客製化混凝土，用於預力之構件、道路工程、緊急搶修等工程上等"
    ],
    specifications: [
      { name: "密度", value: "" },
      { name: "抗壓強度", value: "" },
      { name: "導熱係數", value: "" }
    ]
  }
]

const prisma = new PrismaClient()


export const adminProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  // if (!ctx.user?.isAdmin) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  // return opts.next({
  //   ctx: {
  //     user: ctx.user,
  //   },
  // });
  return opts.next({
    ctx: {
      user: { isAdmin: true },
    },
  });
});

export const appRouter = router({
  productList: publicProcedure.query(async () => {
    return products
  }),
  productById: publicProcedure.input(Number).query(async (opt) => {
    return products.find(p => p.id === opt.input)
  }),
  userList: publicProcedure.query(async () => {
    return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
  }),
  manager: router({
    getJobs: adminProcedure.query(async () => {
      return prisma.jobs.findMany()
    }),
    addAchievementYear: adminProcedure.input(z.object({ year: z.number() })).mutation(async (opts) => {
      const existedYear = await prisma.achievementYear.findFirst({ where: { year: opts.input.year } });
      if (existedYear) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Year already exists' });
      }
      return prisma.achievementYear.create({
        data: {
          year: opts.input.year
        }
      })
    }),
    addAchievementGalleryYear: adminProcedure.input(z.object({ year: z.number() })).mutation(async (opts) => {
      const existedYear = await prisma.achievementGalleryYear.findFirst({ where: { year: opts.input.year } });
      if (existedYear) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Year already exists' });
      }
      return prisma.achievementGalleryYear.create({
        data: {
          year: opts.input.year
        }
      })
    }),
    getAchievementYears: adminProcedure.query(async () => {
      return prisma.achievementYear.findMany()
    }),
    getAchievementGalleryYears: adminProcedure.query(async () => {
      return prisma.achievementGalleryYear.findMany()
    }),
    addAchievement: adminProcedure.input(z.object({ year: z.number(), name: z.string(), manufacturer: z.string() })).mutation(async (opts) => {
      const year = await prisma.achievementYear.findFirst({ where: { year: opts.input.year } });
      return prisma.achievementItem.create({
        data: {
          name: opts.input.name,
          manufacturer: opts.input.manufacturer,
          created_at: (new Date()).toDateString(),
          fk_year_id: year?.id || 0
        }
      })
    }),
    getAchievement: adminProcedure.input(Number).query(async (opts) => {
      return prisma.achievementItem.findMany({ where: { fk_year_id: opts.input } })
    })
  })


});

export type AppRouter = typeof appRouter;