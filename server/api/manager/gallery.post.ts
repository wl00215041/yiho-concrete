import { ServerFile } from "nuxt-file-storage";
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
    const { files } = await readBody<{ files: ServerFile[] }>(event)
    const prisma = new PrismaClient()
    const year = await prisma.achievementGalleryYear.findFirst({ where: { year: body.year } });
    if (!year) {
      throw createError({status: 400, message: 'Year not found'})
    }
    const gallery = await prisma.achievementGallery.create({
      data: {
        name: body.name,
        location: body.location,
        product: body.product,
        fk_year_id: year.id,
        finishedDate: body.finishedDate,
        created_at: (new Date()).toISOString()
      }
    })

    for ( const file of files ) {
        const filename = await storeFileLocally(
            file,         // the file object
            8,            // you can add a name for the file or length of Unique ID that will be automatically generated!
            '/achievements'  // the folder the file will be stored in
        )

        await prisma.achievementGalleryImages.create({
            data: {
                fk_gallery_id: gallery.id,
                file: filename,
                is_cover: body.defaultName === file.name,
                created_at: (new Date()).toISOString()
            }
        })


        // {OR}

        // // Parses a data URL and returns an object with the binary data and the file extension.
        // const { binaryString, ext } = parseDataUrl(file.content)
    }

    // // Deleting Files
    // await deleteFile('requiredFile.txt', '/userFiles')

    // // Get file path
    // await getFileLocally('requiredFile.txt', '/userFiles')
    // // returns: {AbsolutePath}/userFiles/requiredFile.txt

    // // Get all files in a folder
    // await getFilesLocally('/userFiles')
})