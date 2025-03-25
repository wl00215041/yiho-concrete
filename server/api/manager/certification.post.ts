import { ServerFile } from "nuxt-file-storage";
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
    const { files } = await readBody<{ files: ServerFile[] }>(event)
    const prisma = new PrismaClient()
    if (!files || files.length === 0) {
      throw createError({status: 400, message: 'No files found'})
    }

    const filename = await storeFileLocally(
      files[0],         // the file object
      8,            // you can add a name for the file or length of Unique ID that will be automatically generated!
      '/certifications'  // the folder the file will be stored in
  )
    const gallery = await prisma.certifications.create({
      data: {
        name: body.name,
        type: body.type,
        created_at: (new Date()).toISOString(),
        file: filename,
      }
    })


    // // Deleting Files
    // await deleteFile('requiredFile.txt', '/userFiles')

    // // Get file path
    // await getFileLocally('requiredFile.txt', '/userFiles')
    // // returns: {AbsolutePath}/userFiles/requiredFile.txt

    // // Get all files in a folder
    // await getFilesLocally('/userFiles')
})