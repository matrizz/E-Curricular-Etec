import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { sign } from "jsonwebtoken"
import { z } from "zod"

const loginSchema = z.object({
    rm: z.string().min(1, "RM é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const result = loginSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { success: false, message: "Dados inválidos", errors: result.error.flatten().fieldErrors },
                { status: 400 },
            )
        }

        const { rm, password } = body

        const user = await prisma.user.findUnique({
            where: { rm },
            select: {
                id: true,
                name: true,
                email: true,
                rm: true,
                passwordHash: true,
                role: true,
                hasCurriculum: true,
            },
        })

        if (!user) {
            return NextResponse.json({ success: false, message: "RM ou senha incorretos" }, { status: 401 })
        }

        const isPasswordValid = await compare(password, user.passwordHash)
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: "RM ou senha incorretos" }, { status: 401 })
        }

        const token = sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                rm: user.rm,
                role: user.role,
            },
            process.env.NEXTAUTH_SECRET || "secret-key",
            { expiresIn: "7d" },
        )

        return NextResponse.json({
            success: true,
            message: "Login realizado com sucesso",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                rm: user.rm,
                role: user.role,
                hasCurriculum: user.hasCurriculum,
            },
            token,
        })
    } catch (error) {
        console.error("Erro ao fazer login:", error)
        return NextResponse.json({ success: false, message: "Erro ao processar login" }, { status: 500 })
    }
}
