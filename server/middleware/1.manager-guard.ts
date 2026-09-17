// 保護 /api/manager/** 的 REST API（tRPC 由 adminProcedure 另外保護）
// 依賴 0.auth-session.ts 先把 session 放進 event.context
export default eventHandler((event) => {
  if (!event.path.startsWith('/api/manager/')) {
    return
  }

  if (!event.context.session?.user?.email) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})
