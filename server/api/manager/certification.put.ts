import { ServerFile } from "nuxt-file-storage";
import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
    const { files } = await readBody<{ files: ServerFile[] }>(event)
    let filename = undefined
    const existedCertification = await prisma.certifications.findFirst({ where: { id: body.id } });
    if (!existedCertification) {
      throw createError({status: 400, message: 'Certification already exists'})
    }
    if (files && files.length > 0) {
      if (existedCertification.file) {
        await deleteFile(existedCertification.file, '/certifications')
      }
      filename = await storeFileLocally(
        files[0],         // the file object
        8,            // you can add a name for the file or length of Unique ID that will be automatically generated!
        '/certifications'  // the folder the file will be stored in
    )
    }

    return await prisma.certifications.update({
        where: { id: body.id },
        data: {
            name: body.name,
            ...(filename ? { file: filename } : {}),
            updated_at: (new Date()).toISOString(),
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