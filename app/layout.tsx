import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Curricular",
  description: "Sistema para gerenciamento de currículos de alunos da ETEC",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html className="scroll-smooth" lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors ease-in flex flex-col items-center min-h-screen justify-center`}>
        <Analytics />
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
