import CredentialsProvider from "next-auth/providers/credentials"
import { NuxtAuthHandler } from '#auth'
import prisma from "~/server/prisma";

const Provider = (CredentialsProvider as any).default as typeof CredentialsProvider

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret || 'yiho-concrete-sam',
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/k-manager/signin',
    error: '/k-manager/signin',
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }: any) {
      console.log('[Auth Handler] JWT callback - token:', !!token, 'user:', !!user)
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: any) {
      console.log('[Auth Handler] Session callback - session:', !!session, 'token:', !!token)
      if (token && session?.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  events: {
    async signOut() {
      console.log('[Auth Handler] User signed out')
    },
    async session({ session }) {
      console.log('[Auth Handler] Session accessed:', !!session)
    }
  },
  logger: {
    error(code: string, metadata: any) {
      // 過濾掉 JWT 解密錯誤，避免污染日誌
      if (code === 'JWT_SESSION_ERROR') {
        console.log('[Auth Handler] Blocked malicious JWT attempt')
        return
      }
      console.error('[Auth Handler] Error:', code, metadata)
    },
    warn(code: any) {
      console.warn('[Auth Handler] Warning:', code)
    },
    debug(code: any, metadata: any) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth Handler] Debug:', code, metadata)
      }
    }
  },
  providers: [
    Provider({
      // adapter: PrismaAdapter(prisma),
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.username,
          }
        })
        
        // If no error and we have user data, return it
        if (user) {

          if (await verifyPassword(user.password, credentials?.password || '')) {
            return { ...user, id: user.id.toString() }
          }
          return null
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ]
  // your authentication configuration here!
})