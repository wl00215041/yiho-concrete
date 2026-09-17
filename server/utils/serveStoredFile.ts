import { createReadStream, statSync } from 'fs'
import { basename, extname, join } from 'path'
import type { H3Event } from 'h3'

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
}

// 送出 nuxt-file-storage 存在 mount 目錄下的檔案（build 之後才上傳的檔案不在靜態資源清單內，需由此提供）
export const serveStoredFile = (event: H3Event, folder: string) => {
  try {
    // basename 避免 ../ 跳出上傳目錄
    const filename = basename(getRouterParam(event, 'name', { decode: true }) ?? '')
    const mount = useRuntimeConfig().public.fileStorage.mount
    const filePath = join(mount, folder, filename)

    // 檢查檔案是否存在
    const stats = statSync(filePath)
    if (!stats.isFile()) {
      throw new Error('Not a file')
    }

    setHeader(event, 'Content-Type', CONTENT_TYPES[extname(filename).toLowerCase()] ?? 'application/octet-stream')
    // 未知類型一律當下載，避免上傳的 html/svg 在網站網域下被執行
    setHeader(event, 'X-Content-Type-Options', 'nosniff')

    return sendStream(event, createReadStream(filePath))
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }
}
