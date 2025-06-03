import { createReadStream, statSync } from 'fs'
import { join } from 'path'
import { defineEventHandler, sendStream, setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const filename = event.context.params?.filename ?? ''
    // 使用配置中的 mount 路徑
    const config = useRuntimeConfig()
    const filePath = join(config.fileStorage.mount, 'certifications', filename)
    
    // 檢查檔案是否存在
    const stats = statSync(filePath)
    if (!stats.isFile()) {
      throw new Error('Not a file')
    }
    
    // 確定 MIME 類型
    let contentType = 'application/octet-stream'
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      contentType = 'image/jpeg'
    } else if (filename.endsWith('.png')) {
      contentType = 'image/png'
    } else if (filename.endsWith('.pdf')) {
      contentType = 'application/pdf'
    }
    
    // 設置適當的 headers
    setHeader(event, 'Content-Type', contentType)
    
    // 如果需要作為下載檔案，取消下面的註解
    // setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)
    
    // 使用 sendStream 發送檔案
    return sendStream(event, createReadStream(filePath))
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }
})
