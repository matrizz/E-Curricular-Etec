"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { FileText, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LandingHeader() {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg hidden md:inline-block">E-Curricular</span>
                        <span className="font-bold text-lg md:hidden">Currículos ETEC</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/#recursos" className="text-sm font-medium hover:text-primary transition-colors">
                        Recursos
                    </Link>
                    <Link href="/#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
                        Como funciona
                    </Link>
                    {/* <Link href="/#depoimentos" className="text-sm font-medium hover:text-primary transition-colors">
                        Depoimentos
                    </Link> */}
                    <Link href="/#perguntas-frequentes" className="text-sm font-medium hover:text-primary transition-colors">
                        Perguntas Frequentes
                    </Link>
                    <Link href="/#faq" className="text-sm font-medium hover:text-primary transition-colors">
                        FAQ
                    </Link>

                    {session ? (
                        <Button asChild>
                            <Link href="/profile">Meu Perfil</Link>
                        </Button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Entrar</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Registrar</Link>
                            </Button>
                        </div>
                    )}
                </nav>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col space-y-4 mt-8">
                            <Link
                                href="/#recursos"
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Recursos
                            </Link>
                            <Link
                                href="/#como-funciona"
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Como funciona
                            </Link>
                            {/* <Link
                                href="/#depoimentos"
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Depoimentos
                            </Link> */}
                            <Link
                                href="/#perguntas-frequentes"
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Perguntas Frequentes
                            </Link>

                            <Link
                                href="/#faq"
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                FAQ
                            </Link>

                            <div className="pt-4 border-t">
                                {session ? (
                                    <Button className="w-full" asChild>
                                        <Link href="/profile">Meu Perfil</Link>
                                    </Button>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="/login">Entrar</Link>
                                        </Button>
                                        <Button className="w-full" asChild>
                                            <Link href="/register">Registrar</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
