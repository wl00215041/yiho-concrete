import { ServerFile } from "nuxt-file-storage";
import prisma from "~/server/prisma";
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
          name: row.getCell(1).value?.toString().trim() || '',
          manufacturer: row.getCell(2).value?.toString().trim() || '',
          created_at: new Date().toISOString(),
          fk_year_id: year.id
  
        }
      }).filter((item) => item.name && item.manufacturer) || []
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