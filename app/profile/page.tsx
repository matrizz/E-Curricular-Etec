"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getCourseFullName, formatDate } from "@/lib/utils"
import { Edit, Plus, LogOut, User } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [curriculum, setCurriculum] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    fetchCurriculum()
    console.log(session)
  }, [status, router])


  const fetchCurriculum = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/curriculum")
      const data = await response.json()

      if (data.success && data.data.length > 0) {
        setCurriculum(data.data.filter((curr: any) => curr.userId === session?.user.id)[0])
      }
    } catch (error) {
      console.error("Erro ao buscar currículo:", error)
      toast({
        title: "Erro",
        description: "Erro ao buscar currículo. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const handleCreateCurriculum = () => {
    router.push("/form")
  }

  const handleEditCurriculum = () => {
    router.push(`/curriculum/edit/${curriculum.id}`)
  }

  const handleViewCurriculum = () => {
    router.push(`/curriculum/${curriculum.id}`)
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Nome:</span> {session?.user.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {session?.user.email}
                </div>
                <div>
                  <span className="font-medium">RM:</span> {session?.user.rm}
                </div>
                <div>
                  <span className="font-medium">Tipo de Conta:</span>{" "}
                  {session?.user.role === "ADMIN" ? "Administrador" : "Aluno"}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {session?.user.role === "ADMIN" && (
                <Button variant="outline" className="w-full" onClick={() => router.push("/admin")}>
                  Acessar Painel Admin
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {
          session?.user.role === "USER" && session?.user.hasCurriculum || session?.user.role === "ADMIN" && session?.user.hasCurriculum && (
            <div className="md:col-span-2">
              {curriculum ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Meu Currículo</CardTitle>
                    <CardDescription>Última atualização: {formatDate(curriculum.updatedAt)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Curso</h3>
                        <p>{getCourseFullName(curriculum.course)}</p>
                      </div>

                      <div>
                        <h3 className="font-medium">Objetivo Profissional</h3>
                        <p className="line-clamp-3">{curriculum.objective}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <h3 className="font-medium w-full">Habilidades</h3>
                        {curriculum.skills.map((skill: any) => (
                          <span key={skill.id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleViewCurriculum}>
                      <User className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button className="flex-1" onClick={handleEditCurriculum}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Nenhum Currículo Encontrado</CardTitle>
                    <CardDescription>Você ainda não possui um currículo cadastrado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Crie seu currículo para aumentar suas chances de conseguir um estágio ou emprego. Preencha todas as
                      informações relevantes sobre sua formação, experiências e habilidades.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleCreateCurriculum}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Meu Currículo
                    </Button>
                  </CardFooter>
                </Card>
              )}

            </div>
          )
        }
        {
          !session?.user.hasCurriculum && (
            <Card>
              <CardHeader>
                <CardTitle>Nenhum Currículo Encontrado</CardTitle>
                <CardDescription>Você ainda não possui um currículo cadastrado</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Crie seu currículo para aumentar suas chances de conseguir um estágio ou emprego. Preencha todas as
                  informações relevantes sobre sua formação, experiências e habilidades.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCreateCurriculum}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Meu Currículo
                </Button>
              </CardFooter>
            </Card>)
        }
      </div>
    </div>
  )
}

