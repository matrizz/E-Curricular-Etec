import { Separator } from "@radix-ui/react-select";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center w-full flex-col">
            <div className="container flex h-32 self-start items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="https://etecitanhaem.cps.sp.gov.br/" className="py-2 px-4">
                        <img className="h-24 block dark:hidden" src="/logos/etec_ra_baixada_santista_itanhaem_cor.png" alt="Etec de Itanhaém light logo" />
                        <img className="h-24 hidden dark:block" src="/logos/etec_ra_baixada_santista_itanhaem_br.png" alt="Etec de Itanhaém dark logo" />
                    </Link>
                    <Separator className="h-16 mr-4 w-0.5 bg-gray-300" />
                    <Link href="/" className="flex items-center gap-2">
                        <img className="h-16 relative -top-2" src="/logos/e-curricular-logo.png" alt="E-curricular logo" />
                        <img className="h-16 block dark:hidden relative -top-2" src="/logos/e-curricular.png" alt="E-curricular logo" />
                        <img className="h-16 hidden dark:block relative -top-2" src="/logos/e-curricular-dark.png" alt="E-curricular logo" />
                    </Link>
                </div>
            </div>
            {children}
        </div>
    )    
}