"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { FileText, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-select"

export default function LandingHeader() {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-32 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="https://etecitanhaem.cps.sp.gov.br/" className="py-2 px-4">
                        <img className="h-16 lg:h-24 block dark:hidden" src="/logos/etec_ra_baixada_santista_itanhaem_cor.png" alt="Etec de Itanhaém light logo" />
                        <img className="h-24 hidden dark:block" src="/logos/etec_ra_baixada_santista_itanhaem_br.png" alt="Etec de Itanhaém dark logo" />
                    </Link>
                    <Separator className="h-16 mr-4 w-0.5 bg-gray-300" />
                    <Link href="/" className="flex items-center gap-2">
                        <img className="h-12 lg:h-16 relative -top-2" src="/logos/e-curricular-logo.png" alt="E-curricular logo" />
                        <img className="h-12 hidden lg:h-12 md:block dark:hidden relative -top-2" src="/logos/e-curricular.png" alt="E-curricular logo" />
                        <img className="h-12 hidden lg:h-12 dark:hidden md:dark:block relative -top-2" src="/logos/e-curricular-dark.png" alt="E-curricular logo" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden xl:flex items-center gap-6">
                    <Link href="/#recursos" className="font-medium hover:text-primary transition-colors">
                        Recursos
                    </Link>
                    <Link href="/#como-funciona" className="font-medium hover:text-primary transition-colors">
                        Como funciona
                    </Link>
                    {/* <Link href="/#depoimentos" className="text-sm font-medium hover:text-primary transition-colors">
                        Depoimentos
                    </Link> */}
                    <Link href="/#perguntas-frequentes" className="font-medium hover:text-primary transition-colors">
                        Perguntas Frequentes
                    </Link>
                    <Link href="/about" className="font-medium hover:text-primary transition-colors">
                        Sobre
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
                        <button className="size-12 xl:hidden mr-4">
                            <Menu className="size-12" />
                            <span className="sr-only">Toggle menu</span>
                        </button>
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
                                href="/about"
                                className="text-base font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sobre
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
