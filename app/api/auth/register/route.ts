import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import { isValidEtecEmail } from "@/lib/utils"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  rm: z.string().min(2, "RM deve ter pelo menos 2 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos", errors: result.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, email, rm, password } = body

    if (!isValidEtecEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Apenas emails institucionais da ETEC são permitidos" },
        { status: 400 },
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { rm }],
      },
    })

    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email ou RM já cadastrado" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        rm,
        passwordHash: hashedPassword,
      },
    })

    return NextResponse.json({ success: true, message: "Usuário registrado com sucesso" }, { status: 201 })
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)
    return NextResponse.json({ success: false, message: "Erro ao registrar usuário" }, { status: 500 })
  }
}

