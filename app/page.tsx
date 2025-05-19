import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Award, ArrowRight, GraduationCap, Briefcase, Search } from "lucide-react"
import LandingHeader from "@/components/landing-header"
import LandingFooter from "@/components/landing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-1">
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                  ETEC - Sistema de Currículos
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Destaque seu potencial profissional com um currículo de impacto
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Crie, gerencie e compartilhe seu currículo profissional de forma simples e eficiente. Desenvolvido
                  especialmente para alunos da ETEC.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Criar meu currículo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Acessar minha conta</Link>
                  </Button>
                </div>
              </div>
              <div className="relative lg:pl-6">
                <div className="relative overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
                  <div className="overflow-hidden rounded-lg border shadow-sm">
                    <img
                      src="/images/curriculum-preview.jpg"
                      alt="Prévia do currículo"
                      width={550}
                      height={400}
                      className="aspect-[4/3] object-cover w-full"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                    Modelo profissional
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="recursos" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Recursos exclusivos para impulsionar sua carreira
              </h2>
              <p className="mt-4 text-xl text-muted-foreground mx-auto max-w-3xl">
                Nosso sistema oferece tudo o que você precisa para criar um currículo profissional e se destacar no
                mercado de trabalho.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Modelos profissionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Utilize nossos modelos de currículo profissionais, desenvolvidos para destacar suas habilidades e
                    experiências.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <GraduationCap className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Integração com cursos ETEC</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sistema integrado com os cursos da ETEC, facilitando a inclusão de suas formações acadêmicas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Briefcase className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Experiências e habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Organize suas experiências profissionais e destaque suas principais habilidades de forma
                    estruturada.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Search className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Visibilidade para empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Seu currículo pode ser encontrado por empresas parceiras que buscam talentos da ETEC.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Award className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Destaque suas conquistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Seções especiais para destacar suas atividades extracurriculares, projetos e conquistas acadêmicas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Compartilhamento fácil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compartilhe seu currículo facilmente por link, PDF ou impressão com alta qualidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Como funciona</h2>
              <p className="mt-4 text-xl text-muted-foreground mx-auto max-w-3xl">
                Em apenas alguns passos simples, você terá seu currículo profissional pronto para impressionar.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Crie sua conta</h3>
                <p className="text-muted-foreground">
                  Registre-se usando seu email institucional da ETEC e seu RM (Registro de Matrícula).
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Preencha seu currículo</h3>
                <p className="text-muted-foreground">
                  Siga o formulário passo a passo, adicionando suas informações pessoais, formação, experiências e
                  habilidades.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Compartilhe e imprima</h3>
                <p className="text-muted-foreground">
                  Exporte seu currículo em PDF, imprima ou compartilhe o link com potenciais empregadores.
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/register">Começar agora</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* <section id="depoimentos" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">O que nossos alunos dizem</h2>
              <p className="mt-4 text-xl text-muted-foreground mx-auto max-w-3xl">
                Veja como o Sistema de Currículos ETEC tem ajudado nossos alunos a conquistar oportunidades
                profissionais.
              </p>
            </div>

            <Tabs defaultValue="ds" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="ds">Desenvolvimento de Sistemas</TabsTrigger>
                  <TabsTrigger value="min">Informática para Internet</TabsTrigger>
                  <TabsTrigger value="adm">Administração</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="ds" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Lucas Silva</CardTitle>
                          <CardDescription>3º ano - DS</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "Consegui meu primeiro estágio em desenvolvimento graças ao currículo que criei no sistema. O
                        formato profissional e a facilidade de destacar meus projetos fizeram toda a diferença."
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Mariana Costa</CardTitle>
                          <CardDescription>2º ano - DS</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "O sistema me ajudou a organizar todas as minhas habilidades técnicas de forma clara. Os
                        recrutadores elogiaram muito o layout e a organização do meu currículo."
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Pedro Oliveira</CardTitle>
                          <CardDescription>Ex-aluno - DS</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "Mesmo após me formar, continuo utilizando o sistema para manter meu currículo atualizado. Já
                        recebi três propostas de emprego graças à visibilidade que o sistema proporciona."
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="min" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Juliana Mendes</CardTitle>
                          <CardDescription>3º ano - MIN</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "Como estudante de Informática para Internet, pude destacar meus projetos de design e
                        desenvolvimento web. O formato do currículo é perfeito para mostrar meu portfólio."
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Rafael Santos</CardTitle>
                          <CardDescription>2º ano - MIN</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "O sistema me permitiu criar um currículo que destaca minhas habilidades em UX/UI design.
                        Consegui uma vaga de estágio em uma startup graças a isso."
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Camila Rodrigues</CardTitle>
                          <CardDescription>Ex-aluna - MIN</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "Uso o sistema desde que estava na ETEC e hoje trabalho como desenvolvedora front-end. Manter
                        meu currículo atualizado me ajudou a conseguir minha primeira oportunidade."
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="adm" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Fernanda Lima</CardTitle>
                          <CardDescription>3º ano - ADM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "O formato do currículo é perfeito para destacar minhas habilidades administrativas e
                        experiências em gestão. Consegui um estágio em uma multinacional graças ao sistema."
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Bruno Almeida</CardTitle>
                          <CardDescription>2º ano - ADM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "Consegui destacar minhas habilidades em Excel e gestão financeira. O currículo gerado pelo
                        sistema é muito profissional e me ajudou a conseguir meu primeiro emprego."
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Amanda Sousa</CardTitle>
                          <CardDescription>Ex-aluna - ADM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        "O sistema me ajudou a organizar minhas experiências profissionais de forma clara e objetiva.
                        Hoje trabalho na área de RH e recomendo o sistema para todos os alunos."
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section> */}

        <section id="perguntas-frequentes" className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Perguntas frequentes</h2>
              <p className="mt-4 text-xl text-muted-foreground mx-auto max-w-3xl">
                Tire suas dúvidas sobre o Sistema de Currículos ETEC
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold mb-2">Quem pode utilizar o sistema?</h3>
                  <p className="text-muted-foreground">
                    O sistema é exclusivo para alunos e ex-alunos da ETEC, que podem se registrar utilizando seu email
                    institucional e RM.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold mb-2">O sistema é gratuito?</h3>
                  <p className="text-muted-foreground">
                    Sim, o Sistema de Currículos ETEC é totalmente gratuito para todos os alunos e ex-alunos da
                    instituição.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold mb-2">Posso editar meu currículo depois de criá-lo?</h3>
                  <p className="text-muted-foreground">
                    Sim, você pode editar seu currículo a qualquer momento, mantendo-o sempre atualizado com suas novas
                    experiências e habilidades.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold mb-2">Como as empresas podem acessar meu currículo?</h3>
                  <p className="text-muted-foreground">
                    Você pode compartilhar o link do seu currículo diretamente com as empresas, ou exportá-lo em PDF
                    para envio por email ou entrega impressa.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold mb-2">Posso usar o sistema após me formar?</h3>
                  <p className="text-muted-foreground">
                    Sim, ex-alunos podem continuar utilizando o sistema para manter seus currículos atualizados e
                    aproveitar as oportunidades profissionais.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-xl font-bold mb-2">Como recupero minha senha?</h3>
                  <p className="text-muted-foreground">
                    Na página de login, clique em "Esqueceu a senha?" e siga as instruções para redefinir sua senha
                    utilizando seu email institucional e RM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pronto para iniciar sua jornada profissional?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Crie seu currículo profissional agora mesmo e destaque-se no mercado de trabalho.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Criar meu currículo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Acessar minha conta</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
