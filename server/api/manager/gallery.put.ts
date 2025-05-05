import { ServerFile } from "nuxt-file-storage";
import prisma from "~/server/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
    const { files } = await readBody<{ files: ServerFile[] }>(event)
    const existedGallery = await prisma.achievementGallery.findFirst({ where: { id: body.id } });
    const toDeleteImages: string[] = body.toDeleteImages
    let isCoverSet = false
    if (!existedGallery) {
      throw createError({status: 400, message: 'Gallery not found'})
    }

    const gallery = await prisma.achievementGallery.update({
        where: { id: body.id },
        data: {
            name: body.name,
            location: body.location,
            product: body.product,
            finishedDate: body.finishedDate,
        }
    })

    for ( const file of files ) {
        const filename = await storeFileLocally(
            file,         // the file object
            8,            // you can add a name for the file or length of Unique ID that will be automatically generated!
            '/achievements'  // the folder the file will be stored in
        )
        const isCover = body.defaultName === file.name
        if (isCover) {
          isCoverSet = true
        }
        await prisma.achievementGalleryImages.create({
            data: {
                fk_gallery_id: gallery.id,
                file: filename,
                is_cover: body.defaultName === file.name,
                created_at: (new Date()).toISOString()
            }
        })
    }

    if (toDeleteImages) {
        for ( const image of toDeleteImages ) {
          const existedImages = await prisma.achievementGalleryImages.findFirst({ where: { file: image } });
            await prisma.achievementGalleryImages.delete({
              where: { id: existedImages?.id }
            })
            await deleteFile(image, '/achievements')
        }
    }
    console.log('isCoverSet', isCoverSet)
    if(!isCoverSet) {
      const defaultImage = await prisma.achievementGalleryImages.findFirst({ where: { file: body.defaultName } });
      if (defaultImage) {
        await prisma.achievementGalleryImages.updateMany({
          where: { fk_gallery_id: gallery.id },
          data: {
            is_cover: false
          }
        })
      }
      await prisma.achievementGalleryImages.update({
        where: { id: defaultImage?.id },
        data: {
          is_cover: true
        }
      })
    }
})