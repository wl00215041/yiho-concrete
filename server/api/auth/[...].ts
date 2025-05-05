import CredentialsProvider from "next-auth/providers/credentials"
import { NuxtAuthHandler } from '#auth'
import prisma from "~/server/prisma";
const Provider = (CredentialsProvider as any).default as typeof CredentialsProvider
export default NuxtAuthHandler({
  secret: 'yiho-concrete',
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