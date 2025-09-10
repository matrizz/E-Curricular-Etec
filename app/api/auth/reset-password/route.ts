import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import { generateRandomPassword } from "@/lib/utils"
import { z } from "zod"
import { sendEmail } from "@/lib/email"
import { htmlEmailBody } from "../../email/route"



const requestResetSchema = z.object({
  email: z.string().email("Email inválido"),
  rm: z.string().min(2, "RM deve ter pelo menos 2 caracteres"),
})

const confirmResetSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.token) {
      const result = confirmResetSchema.safeParse(body)
      if (!result.success) {
        return NextResponse.json(
          { success: false, message: "Dados inválidos", errors: result.error.flatten().fieldErrors },
          { status: 400 },
        )
      }

      const { token, password } = body

      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExp: {
            gt: new Date(),
          },
        },
      })

      if (!user) {
        return NextResponse.json({ success: false, message: "Token inválido ou expirado" }, { status: 400 })
      }

      const hashedPassword = await hashPassword(password)


      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash: hashedPassword,
          resetToken: null,
          resetTokenExp: null,
        },
      })

      return NextResponse.json({ success: true, message: "Senha redefinida com sucesso" }, { status: 200 })
    } else {
      const result = requestResetSchema.safeParse(body)
      if (!result.success) {
        return NextResponse.json(
          { success: false, message: "Dados inválidos", errors: result.error.flatten().fieldErrors },
          { status: 400 },
        )
      }

      const { email, rm } = body

      const user = await prisma.user.findFirst({
        where: {
          email,
          rm,
        },
        select: {
          email: true,
          id: true,
        }
      })

      if (!user) {
        return NextResponse.json({ success: false, message: "Usuário não encontrado" }, { status: 404 })
      }

      const resetToken = generateRandomPassword(32).replaceAll('#', '')
      const resetTokenExp = new Date(Date.now() + 3600000)

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExp,
        },
      })


      if (!user.email) {
        await sendEmail({
          to: email,
          subject: "Redefinição de senha",
          html: htmlEmailBody({
            subject: 'Redefinição de senha', message: `<p>Para redefinir sua senha, clique no link abaixo:</p>
          <a href="http://localhost:3000/reset-password?token=${resetToken}">Redefinir senha</a>`
          }),
        })
      }

      const emailsend = await sendEmail({
        to: email,
        subject: "Redefinição de senha",
        html: htmlEmailBody({
          subject: 'Redefinição de senha', message: `<p>Para redefinir sua senha, clique no link abaixo:</p>
          <a href="http://localhost:3000/reset-password?token=${resetToken}">Redefinir senha</a>`
        }),
      })

      return NextResponse.json(
        {
          success: true,
          message: "Solicitação de redefinição de senha enviada com sucesso",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Erro ao processar solicitação de reset de senha:", error)
    return NextResponse.json({ success: false, message: "Erro ao processar solicitação" }, { status: 500 })
  }
}

