"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

export function Providers({ children, session }: { children: React.ReactNode; session: any }) {
    return (
        <SessionProvider session={session}>
            { /* @ts-ignore */ }
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem suppressHydrationWarning>
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}
