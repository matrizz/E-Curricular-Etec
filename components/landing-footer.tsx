import Link from "next/link"
import { FileText, Mail, MapPin, Phone } from "lucide-react"

export default function LandingFooter() {
    return (
        // <footer className="bg-muted py-12 border-t">
        //     <div className="container px-4 md:px-6">
        //         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        //             <div className="space-y-4">
        //                 <div className="flex items-center gap-2">
        //                     <FileText className="h-6 w-6 text-primary" />
        //                     <span className="font-bold text-lg">Sistema de Currículos ETEC</span>
        //                 </div>
        //                 <p className="text-muted-foreground">
        //                     Desenvolvido especialmente para alunos da ETEC, nosso sistema ajuda você a criar currículos profissionais
        //                     e impulsionar sua carreira.
        //                 </p>
        //                 <div className="space-y-2">
        //                     <div className="flex items-center gap-2">
        //                         <MapPin className="h-4 w-4 text-muted-foreground" />
        //                         <span className="text-sm text-muted-foreground">Av. Exemplo, 1000 - São Paulo, SP</span>
        //                     </div>
        //                     <div className="flex items-center gap-2">
        //                         <Mail className="h-4 w-4 text-muted-foreground" />
        //                         <span className="text-sm text-muted-foreground">contato@etec.sp.gov.br</span>
        //                     </div>
        //                     <div className="flex items-center gap-2">
        //                         <Phone className="h-4 w-4 text-muted-foreground" />
        //                         <span className="text-sm text-muted-foreground">(11) 1234-5678</span>
        //                     </div>
        //                 </div>
        //             </div>

        //             <div>
        //                 <h3 className="font-medium text-base mb-4">Links Rápidos</h3>
        //                 <ul className="space-y-2">
        //                     <li>
        //                         <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Página Inicial
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Criar Conta
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Entrar
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Meu Perfil
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </div>

        //             <div>
        //                 <h3 className="font-medium text-base mb-4">Recursos</h3>
        //                 <ul className="space-y-2">
        //                     <li>
        //                         <Link href="/#recursos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Modelos de Currículo
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link
        //                             href="/#como-funciona"
        //                             className="text-sm text-muted-foreground hover:text-primary transition-colors"
        //                         >
        //                             Como Funciona
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Perguntas Frequentes
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link
        //                             href="/#depoimentos"
        //                             className="text-sm text-muted-foreground hover:text-primary transition-colors"
        //                         >
        //                             Depoimentos
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </div>

        //             <div>
        //                 <h3 className="font-medium text-base mb-4">Cursos ETEC</h3>
        //                 <ul className="space-y-2">
        //                     <li>
        //                         <Link href="https://etecitanhaem.cps.sp.gov.br/desenvolvimento-de-sistemas/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Desenvolvimento de Sistemas
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="https://etecitanhaem.cps.sp.gov.br/informatica-para-internet/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Informática para Internet
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="https://etecitanhaem.cps.sp.gov.br/administracao/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Administração
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="https://etecitanhaem.cps.sp.gov.br/meio-ambiente/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Meio Ambiente
        //                         </Link>
        //                     </li>
        //                     <li>
        //                         <Link href="https://etecitanhaem.cps.sp.gov.br/farmacia/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
        //                             Farmácia
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>

        //         <div className="mt-12 pt-8 border-t text-center">
        //             <p className="text-sm text-muted-foreground">
        //                 &copy; {new Date().getFullYear()} Sistema de Currículos ETEC. Todos os direitos reservados.
        //             </p>
        //         </div>
        //     </div>
        // </footer>

        <footer className="bg-[#ae0f0a] dark:bg-muted text-white py-12 border-t">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img className="h-12" src="/logos/e-curricular-logo.png" alt="e-curricular logo" />
                            <span className="font-bold text-lg">Sistema de Currículos ETEC Itanhaém</span>
                        </div>
                        <p className="text-white dark:text-muted-foreground">
                            Desenvolvido especialmente para alunos da ETEC, nosso sistema ajuda você a criar currículos profissionais
                            e impulsionar sua carreira.
                        </p>
                        <div className="space-y-2 text-white dark:text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4" />
                                <span className="text-sm">Av. José Batista Campos, 1431 - Cidade Anchieta - Itanhaém - SP - CEP: 11740-000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">contato@etec.sp.gov.br</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span className="text-sm">(13) 3426-4926</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-base mb-4">Links Rápidos</h3>
                        <ul className="space-y-2 text-white dark:text-muted-foreground">
                            <li>
                                <Link href="/" className="text-sm hover:text-primary transition-colors">
                                    Página Inicial
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-sm hover:text-primary transition-colors">
                                    Criar Conta
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-sm hover:text-primary transition-colors">
                                    Entrar
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="text-sm hover:text-primary transition-colors">
                                    Meu Perfil
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-base mb-4">Recursos</h3>
                        <ul className="space-y-2 text-white dark:text-muted-foreground">
                            <li>
                                <Link href="/#recursos" className="text-sm hover:text-primary transition-colors">
                                    Modelos de Currículo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#como-funciona"
                                    className="text-sm hover:text-primary transition-colors"
                                >
                                    Como Funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq" className="text-sm hover:text-primary transition-colors">
                                    Perguntas Frequentes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#depoimentos"
                                    className="text-sm hover:text-primary transition-colors"
                                >
                                    Depoimentos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium text-base mb-4">Cursos ETEC</h3>
                        <ul className="space-y-2 text-white dark:text-muted-foreground">
                            <li>
                                <Link href="https://etecitanhaem.cps.sp.gov.br/desenvolvimento-de-sistemas/" className="text-sm hover:text-primary transition-colors">
                                    Desenvolvimento de Sistemas
                                </Link>
                            </li>
                            <li>
                                <Link href="https://etecitanhaem.cps.sp.gov.br/informatica-para-internet/" className="text-sm hover:text-primary transition-colors">
                                    Informática para Internet
                                </Link>
                            </li>
                            <li>
                                <Link href="https://etecitanhaem.cps.sp.gov.br/administracao/" className="text-sm hover:text-primary transition-colors">
                                    Administração
                                </Link>
                            </li>
                            <li>
                                <Link href="https://etecitanhaem.cps.sp.gov.br/meio-ambiente/" className="text-sm hover:text-primary transition-colors">
                                    Meio Ambiente
                                </Link>
                            </li>
                            <li>
                                <Link href="https://etecitanhaem.cps.sp.gov.br/farmacia/" className="text-sm hover:text-primary transition-colors">
                                    Farmácia
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center">
                    <p className="text-sm text-white dark:text-muted-foreground">
                        &copy; {new Date().getFullYear()} CoreX. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
