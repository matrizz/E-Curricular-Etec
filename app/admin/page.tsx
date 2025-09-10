"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { getCourseFullName, formatDate } from "@/lib/utils"
import { Search, User, Trash2, Edit, ArrowLeft, Mail, Send } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

interface Curriculum {
  id: string
  name: string
  email: string
  rm: string
  phone: string
  course: string
  createdAt: string
  updatedAt: string
}

interface EmailForm {
  subject: string
  message: string
  recipients: 'all' | 'course'
  course: string
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [curricula, setCurricula] = useState<Curriculum[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [availableCourses, setAvailableCourses] = useState<string[]>([])
  const [emailForm, setEmailForm] = useState<EmailForm>({
    subject: '',
    message: '',
    recipients: 'all',
    course: ''
  })
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated" || session?.user.role !== "ADMIN") {
      router.push("/login")
      return
    }

    fetchCurricula()
    fetchAvailableCourses()
  }, [status, session, router])

  const fetchCurricula = async (course?: string) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (course) params.append("course", course)

      const response = await fetch(`/api/curriculum?${params.toString()}`)
      const data = await response.json()


      if (data.success) {
        setCurricula(data.data)
      } else {
        return toast({
          title: "Erro",
          description: data.message || "Erro ao buscar currículos",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao buscar currículos:", error)
      toast({
        title: "Erro",
        description: "Erro ao buscar currículos. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchCurricula(activeTab !== "all" ? activeTab : undefined)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    fetchCurricula(value !== "all" ? value : undefined)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este currículo?")) return

    try {
      const response = await fetch(`/api/curriculum/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Sucesso",
          description: "Currículo excluído com sucesso",
        })

        setCurricula((prev) => prev.filter((curriculum) => curriculum.id !== id))
      } else {
        toast({
          title: "Erro",
          description: data.message || "Erro ao excluir currículo",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao excluir currículo:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir currículo. Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/curriculum/edit/${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/curriculum/${id}`)
  }

  const handleBack = () => {
    router.push("/")
  }

  const fetchAvailableCourses = async () => {
    try {
      const response = await fetch('/api/email')
      const data = await response.json()
      
      if (data.success) {
        setAvailableCourses(data.courses)
      }
    } catch (error) {
      console.error('Erro ao buscar cursos:', error)
    }
  }

  const handleEmailFormChange = (field: keyof EmailForm, value: string) => {
    setEmailForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingEmail(true)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailForm.subject,
          message: emailForm.message,
          recipients: emailForm.recipients,
          course: emailForm.recipients === 'course' ? emailForm.course : undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Sucesso!",
          description: data.message,
        })
        
        setEmailForm({
          subject: '',
          message: '',
          recipients: 'all',
          course: ''
        })
        setShowEmailForm(false)
      } else {
        toast({
          title: "Erro ao enviar email",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      toast({
        title: "Erro ao enviar email",
        description: "Erro interno do servidor. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="w-full transition-all ease-in-out py-10">
        <div className="flex justify-center self-center items-center h-64">
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex flex-col self-center py-10">
      <Toaster />
      <Button variant="outline" className="w-fit my-4" onClick={handleBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      <div className="mb-6">
        <Button 
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Mail className="h-4 w-4 mr-2" />
          {showEmailForm ? 'Cancelar Envio' : 'Enviar Email'}
        </Button>
      </div>

      {showEmailForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enviar Email</CardTitle>
            <CardDescription>Envie emails para todos os usuários ou para usuários de um curso específico</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  value={emailForm.subject}
                  onChange={(e) => handleEmailFormChange('subject', e.target.value)}
                  placeholder="Digite o assunto do email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Destinatários</Label>
                <Select
                  value={emailForm.recipients}
                  onValueChange={(value: 'all' | 'course') => {
                    handleEmailFormChange('recipients', value)
                    if (value === 'all') {
                      handleEmailFormChange('course', '')
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os destinatários" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os usuários</SelectItem>
                    <SelectItem value="course">Usuários de um curso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {emailForm.recipients === 'course' && (
                <div className="space-y-2">
                  <Label htmlFor="course">Curso</Label>
                  <Select
                    value={emailForm.course}
                    onValueChange={(value) => handleEmailFormChange('course', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCourses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {getCourseFullName(course)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  value={emailForm.message}
                  onChange={(e) => handleEmailFormChange('message', e.target.value)}
                  placeholder="Digite a mensagem do email"
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSendingEmail}>
                  <Send className="h-4 w-4 mr-2" />
                  {isSendingEmail ? 'Enviando...' : 'Enviar Email'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowEmailForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gerenciamento de Currículos</CardTitle>
          <CardDescription>Visualize, edite ou exclua currículos dos alunos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input
              placeholder="Buscar por nome, email ou RM"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>

          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="MIN">Informática</TabsTrigger>
              <TabsTrigger value="MAM">Meio Ambiente</TabsTrigger>
              <TabsTrigger value="MAD">Administração</TabsTrigger>
              <TabsTrigger value="DS">Des. Sistemas</TabsTrigger>
              <TabsTrigger value="FAR">Farmácia</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {curricula.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Nenhum currículo encontrado</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Foto</th>
                        <th className="py-3 px-4 text-left">Nome</th>
                        <th className="py-3 px-4 text-left">RM</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Curso</th>
                        <th className="py-3 px-4 text-left">Atualizado</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {curricula.map((curriculum) => (
                        <tr key={curriculum.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <img
                              // @ts-ignore
                              src={curriculum.image || "/default-avatar.png"}
                              alt={curriculum.name}
                              className="w-10 h-10 rounded-full"
                            /></td>
                          <td className="py-3 px-4">{curriculum.name}</td>
                          <td className="py-3 px-4">{curriculum.rm}</td>
                          <td className="py-3 px-4">{curriculum.email}</td>
                          <td className="py-3 px-4">{getCourseFullName(curriculum.course)}</td>
                          <td className="py-3 px-4">{formatDate(curriculum.updatedAt)}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleView(curriculum.id)}>
                                <User className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEdit(curriculum.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDelete(curriculum.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

