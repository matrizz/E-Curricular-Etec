import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare, hash } from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        rm: { label: "RM", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.rm || !credentials?.password) {
          throw new Error("RM e senha são obrigatórios")
        }

        const user = await prisma.user.findUnique({
          where: { rm: credentials.rm },
        })

        if (!user) {
          throw new Error("RM não encontrado")
        }

        const isPasswordValid = await compare(credentials.password, user.passwordHash)

        if (!isPasswordValid) {
          throw new Error("Senha incorreta")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          rm: user.rm,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.rm = user.rm
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.rm = token.rm as string
        session.user.role = token.role as string

        // Buscar hasCurriculum do banco de dados
        const user = await prisma.user.findUnique({
          where: { id: token.id as string }
        })
        session.user.hasCurriculum = user?.hasCurriculum as boolean
      }
      return session
    },
  },
}

export async function hashPassword(password: string) {
  return hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}
