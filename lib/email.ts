import nodemailer from 'nodemailer'

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[]
  subject: string
  html: string
  text?: string
}) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: {
      name: process.env.SMTP_FROM_NAME || 'E-Curricular Etec - Itanhaém',
      address: process.env.SMTP_FROM || process.env.SMTP_USER || '',
    },
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // Remove HTML tags se text não for fornecido
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw error
  }
}

export const validateEmailConfig = () => {
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
  ]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    throw new Error(
      `Configurações de email faltando: ${missing.join(', ')}`
    )
  }
}
