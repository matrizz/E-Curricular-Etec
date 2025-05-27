'use client'

import { Button } from "@/components/ui/button"
import Member from "@/components/ui/member"
import { ArrowLeft } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


export default function About() {

    const { data: session, status } = useSession()
    const router = useRouter()

    type ProjectMember = {
        image: string
        name: string
        role: string
        description: string
    }
    const members = [
        {
            image: "/members/luiz_h.jpeg",
            name: "Luiz Henrique",
            role: "Cofundador & Desenvolvedor Líder",
            description: "Responsável pela fundação e liderança técnica do projeto, cuidando das decisões de arquitetura, desenvolvimento full stack e integração entre as áreas do sistema."
        },
        {
            image: "/members/robert_l.jpeg",
            name: "Robert Luiz",
            role: "Cofundador & Desenvolvedor Front-End",
            description: "Responsável pela criação das interfaces visuais do projeto, focando em responsividade, usabilidade e experiência do usuário. Contribuiu diretamente para a identidade visual e navegação da aplicação."
        },
        {
            image: "/members/",
            name: "Vitor Brito",
            role: "Cofundador & Desenvolvedor Back-End",
            description: "Responsável pela lógica de funcionamento do sistema, estruturação das rotas e integração com o banco de dados, garantindo estabilidade, segurança e performance na comunicação entre front-end e dados."
        },
        {
            image: "/members/rafael_r.jpeg",
            name: "Rafael Rodrigues",
            role: "Planejador & Desenvolvedor",
            description: "Responsável pela fase inicial do projeto, contribuindo com a definição de objetivos, estrutura, funcionalidades e organização geral. Atuou no planejamento estratégico e na base conceitual que orientou o desenvolvimento."
        },
        {
            image: "/members/henri_l.jpeg",
            name: "Henri Lidney",
            role: "Planejador & Desenvolvedor",
            description: "Responsável pela fase inicial do projeto, contribuindo com a definição de objetivos, estrutura, funcionalidades e organização geral. Atuou no planejamento estratégico e na base conceitual que orientou o desenvolvimento."
        },
        {
            image: "/members/gabriel_m.jpeg",
            name: "Gabriel Mastrorosa",
            role: "Analista de QA (Quality Assurance)",
            description: "Responsável por testar e validar funcionalidades do sistema, garantindo a qualidade, estabilidade e correção das entregas durante o desenvolvimento do projeto."
        },
        {
            image: "/members/nicolas_s.jpeg",
            name: "Nícolas S. Muniz",
            role: "Analista de QA (Quality Assurance)",
            description: "Responsável por testar e validar funcionalidades do sistema, garantindo a qualidade, estabilidade e correção das entregas durante o desenvolvimento do projeto."
        },
        {
            image: "/members/",
            name: "Luiz Guilherme",
            role: "Analista de QA (Quality Assurance)",
            description: "Responsável por testar e validar funcionalidades do sistema, garantindo a qualidade, estabilidade e correção das entregas durante o desenvolvimento do projeto."
        }

    ] satisfies ProjectMember[]

    const handleBack = () => {
        if (session?.user.role === "ADMIN") {
            router.push("/admin")
        } else {
            router.push("/profile")
        }
    }

    return (
        <div className="w-full md:p-8">
            <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
            </Button>
            <div className="w-full flex flex-col justify-center items-center px-2 py-4">
                <h1 className="w-full h-full flex justify-center items-center text-3xl font-bold py-8">Sobre</h1>
                <div className="w-full flex flex-col justify-evenly items-center gap-4 py-8">
                    <div className="w-full md:w-1/3">
                        <div className="w-full flex flex-col justify-center items-center">
                            <img className="w-32 h-32 mb-2 text-center object-cover rounded-full border-4 border-slate-600" src={members[0].image} alt={members[0].name} />
                            <h2 className="text-2xl font-bold">
                                {members[0].name}
                            </h2>
                            <span>{members[0].role}</span>
                            <div className="w-full text-center p-2">
                                <p className="text-sm">
                                    {members[0].description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 gap-y-12 md:grid-cols-2 justify-around items-center flex-col">
                        {members.slice(1).map((member, index) => (
                            <Member key={index} image={member.image} name={member.name} role={member.role} description={member.description} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}