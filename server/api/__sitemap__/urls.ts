import products from '~/constants/products';
import prisma from "~/server/prisma";

export default defineSitemapEventHandler(async () => {
  const productUrls = products.map(product => ({
    loc: `/products/${product.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.8,
  }));

  const gallery = await prisma.achievementGallery.findMany()

  const galleryUrls = gallery.map(item => ({
    loc: `/achievements/${item.id}`,
    lastmod: item.created_at,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  return [
    ...productUrls,
    ...galleryUrls,
  ];
});
