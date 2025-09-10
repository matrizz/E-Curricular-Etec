import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAuth } from '@/lib/adminAuth'
import { sendEmail, validateEmailConfig } from '@/lib/email'
import { prisma } from '@/lib/prisma'

interface EmailRequest {
  subject: string
  message: string
  recipients: 'all' | 'course'
  course?: string
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await validateAdminAuth()

    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: 403 }
      )
    }

    validateEmailConfig()

    const { subject, message, recipients, course }: EmailRequest = await req.json()

    if (!subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Assunto e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    if (recipients === 'course' && !course) {
      return NextResponse.json(
        { success: false, message: 'Curso é obrigatório quando recipients é "course"' },
        { status: 400 }
      )
    }

    let users
    if (recipients === 'all') {
      users = await prisma.user.findMany({
        select: {
          name: true,
          curriculum: {
            select: {
              course: true,
              email: true
            }
          }
        }
      })
    } else if (recipients === 'course' && course) {
      users = await prisma.user.findMany({
        where: {
          curriculum: {
            course: course
          }
        },
        select: {
          name: true,
          curriculum: {
            select: {
              course: true,
              email: true
            }
          }
        }
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Tipo de destinatários inválido' },
        { status: 400 }
      )
    }

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Nenhum usuário encontrado para os critérios selecionados' },
        { status: 400 }
      )
    }

    const emails = users.map(user => user.curriculum?.email)

    await sendEmail({
      // @ts-expect-error
      to: emails,
      subject: `[E-Curricular Etec - Itanhaém] ${subject}`,
      html: htmlEmailBody({subject, message}),
    })

    return NextResponse.json({
      success: true,
      message: `Email enviado com sucesso para ${emails.length} destinatário(s)`,
      recipientsCount: emails.length
    })

  } catch (error) {
    console.error('Erro ao enviar email:', error)

    let errorMessage = 'Erro interno do servidor ao enviar email'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    )
  }
}

export const htmlEmailBody = ({ subject, message }: { subject: string, message: string }) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .footer {
            padding: 20px;
            background-color: #374151;
            color: white;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
          }
          .message {
            background-color: white;
            padding: 20px;
            border-radius: 4px;
            margin: 10px 0;
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>E-Curricular Etec de Itanhaém</h1>
          <h2>${subject}</h2>
        </div>
        <div class="content">
          <div class="message">
${message}
          </div>
        </div>
        <div class="footer">
          <p>Esta é uma mensagem oficial do sistema E-Curricular Etec de Itanhaém</p>
          <p>© 2024 Etec de Itanhaém - Todos os direitos reservados</p>
        </div>
      </body>
      </html>
    `
}

export async function GET() {
  try {
    const authResult = await validateAdminAuth()

    if (!authResult.isValid) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: 403 }
      )
    }

    const courses = await prisma.curriculum.findMany({
      select: {
        course: true,
      },
      distinct: ['course'],
    })

    const courseList = courses.map(c => c.course)

    return NextResponse.json({
      success: true,
      courses: courseList
    })

  } catch (error) {
    console.error('Erro ao buscar cursos:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar cursos' },
      { status: 500 }
    )
  }
}
