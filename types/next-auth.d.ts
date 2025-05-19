import "next-auth"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Estendendo o tipo User para incluir propriedades personalizadas
   */
  interface User {
    id: string
    name: string
    email: string
    rm: string
    role: string
  }

  /**
   * Estendendo o tipo Session para incluir propriedades personalizadas no user
   */
  interface Session {
    user: {
      id: string
      rm: string
      role: string
      hasCurriculum: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Estendendo o tipo JWT para inclur propriedades personalizadas
   */
  interface JWT {
    id: string
    rm: string
    role: string
  }
}

