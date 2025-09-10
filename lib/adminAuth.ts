import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'
import { NextRequest, NextResponse } from 'next/server'

export async function validateAdminAuth() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { isValid: false, error: 'Usuário não autenticado' }
  }

  if (session.user.role !== 'ADMIN') {
    return { isValid: false, error: 'Acesso negado. Apenas administradores podem realizar esta ação.' }
  }

  return { isValid: true, user: session.user }
}

export async function withAdminAuth(
  req: NextRequest,
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  const authResult = await validateAdminAuth()

  if (!authResult.isValid) {
    return NextResponse.json(
      { success: false, message: authResult.error },
      { status: 403 }
    )
  }

  return handler(req, authResult.user)
}
