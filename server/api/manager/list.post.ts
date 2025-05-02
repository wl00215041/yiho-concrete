import { ServerFile } from "nuxt-file-storage";
import prisma from "~/lib/prisma";
import Excel, { stream } from 'exceljs'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { files } = await readBody<{ files: ServerFile[] }>(event)
  const year = await prisma.achievementGalleryYear.findFirst({ where: { year: body.year } });
  if (!year) {
    throw createError({ status: 400, message: 'Year not found' })
  }


  const sheet = new Excel.Workbook()
  if (!files || files.length === 0) {
    throw createError({ status: 400, message: 'No files found' })
  }
  const { binaryString, ext } = parseDataUrl(files[0].content)
  try {
    await sheet.xlsx.load(binaryString as any).then(async () => {
      const worksheet = sheet.getWorksheet(1);
      const rows = worksheet?.getRows(2, worksheet.rowCount);
      const data = rows?.map((row) => {
        return {
          name: row.getCell(1).value?.toString() || '',
          manufacturer: row.getCell(2).value?.toString() || '',
          created_at: new Date().toISOString(),
          fk_year_id: year.id
  
        }
      }) || []
      await prisma.achievementItem.deleteMany()
      await prisma.achievementItem.createMany({
        data: data
      }
      )
    })
  } catch (error) {
    console.log(error)
    throw createError({ status: 400, message: 'Invalid file format' })
  }
})