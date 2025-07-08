"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { getCourseFullName, formatDate } from "@utils/helpers"
import { Edit, ArrowLeft, Printer, Download, FileText, Eye } from "lucide-react"
import { useReactToPrint } from "react-to-print"
import PrintCurriculum from "@/components/print-curriculum"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Toaster } from "@/components/ui/toaster"

export default function ViewCurriculumPage({ params }: { params: { id: string } }) {
  const { id } = useParams()
  const { data: session, status } = useSession()
  const [curriculum, setCurriculum] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPrinting, setIsPrinting] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const router = useRouter()
  const printRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    fetchCurriculum()
  }, [status, id, router])

  const fetchCurriculum = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/curriculum/${id}`)
      const data = await response.json()

      if (data.success) {
        setCurriculum(data.data)
      } else {
        toast({
          title: "Erro",
          description: data.message || "Erro ao buscar currículo",
          variant: "destructive",
        })
        router.push("/profile")
      }
    } catch (error) {
      console.error("Erro ao buscar currículo:", error)
      toast({
        title: "Erro",
        description: "Erro ao buscar currículo. Tente novamente mais tarde.",
        variant: "destructive",
      })
      router.push("/profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    router.push(`/curriculum/edit/${id}`)
  }

  const handleBack = () => {
    if (session?.user.role === "ADMIN") {
      router.push("/admin")
    } else {
      router.push("/profile")
    }
  }


  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Currículo - ${curriculum?.name || ""}`,
    onBeforePrint: () => {
      setIsPrinting(true)
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
    },
    onAfterPrint: () => {
      setIsPrinting(false)
    },
  })

  const handleExportPDF = async () => {
    if (!printRef.current) return

    setIsPrinting(true)
    toast({
      title: "Gerando PDF",
      description: "Aguarde enquanto o PDF está sendo gerado...",
      variant: "default",
      duration: 5000,
    })

    try {
      const element = printRef.current


      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 15000,
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      try {
        const imgData = canvas.toDataURL("image/jpeg", 1)

        if (imgHeight > pageHeight) {
          let heightLeft = imgHeight - pageHeight
          let position = -pageHeight

          while (heightLeft > 0) {
            pdf.addPage()
            position -= pageHeight

            pdf.addImage({
              imageData: imgData,
              format: "JPEG",
              x: 0,
              y: position,
              width: imgWidth,
              height: imgHeight,
            })

            heightLeft -= pageHeight
          }
        }

        pdf.save(`curriculo-${curriculum?.name || "etec"}.pdf`)

        toast({
          title: "PDF gerado com sucesso",
          description: "O arquivo foi baixado para o seu dispositivo.",
        })
      } catch (imgError) {
        console.error("Erro ao processar imagem:", imgError)

        toast({
          title: "Alternativa de impressão",
          description: "Não foi possível gerar o PDF. Abrindo diálogo de impressão...",
        })

        setTimeout(() => {
          handlePrint()
        }, 1000)
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o PDF. Tente usar a opção de impressão.",
        variant: "destructive",
      })

      setTimeout(() => {
        handlePrint()
      }, 1000)
    } finally {
      setIsPrinting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!curriculum) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Currículo não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="flex gap-2">
          {(session?.user.id === curriculum.userId || session?.user.role === "ADMIN") && (
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
          <Button variant="outline" onClick={() => router.push(`${id}/view`)}>
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button variant="outline" onClick={() => router.push(`${id}/view?print=true`)}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              {curriculum.image && (
                <div className="flex justify-center mb-4">
                  <img
                    src={curriculum.image || "/placeholder.svg"}
                    alt={curriculum.name}
                    className="w-32 h-32 object-cover rounded-full border"
                  />
                </div>
              )}

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{curriculum.name}</h2>
                <p className="text-muted-foreground">{getCourseFullName(curriculum.course)}</p>

                <div className="pt-4 space-y-2">
                  <div>
                    <span className="font-medium">RM:</span> {curriculum.rm}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {curriculum.email}
                  </div>
                  <div>
                    <span className="font-medium">Telefone:</span> {curriculum.phone}
                  </div>
                  {curriculum.phone2 && (
                    <div>
                      <span className="font-medium">Telefone 2:</span> {curriculum.phone2}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Data de Nascimento:</span> {formatDate(curriculum.birth)}
                  </div>
                  <div>
                    <span className="font-medium">Gênero:</span> {curriculum.genre}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-1">Endereço</h3>
                  <p>{curriculum.street}</p>
                  <p>
                    {curriculum.city}, {curriculum.state}
                  </p>
                  <p>CEP: {curriculum.zip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Objetivo Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{curriculum.objective}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Formação Acadêmica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium">ETEC</h3>
                <p>{getCourseFullName(curriculum.course)}</p>
              </div>

              {curriculum.additionalEducation.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Outras Formações</h3>
                  <ul className="space-y-2">
                    {curriculum.additionalEducation.map((edu: any) => (
                      <li key={edu.id}>
                        <p className="font-medium">{edu.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startYear} - {edu.endYear || "Atual"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {curriculum.extracurricular.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Atividades Extracurriculares</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {curriculum.extracurricular.map((activity: any) => (
                    <li key={activity.id}>
                      <div className="flex justify-between">
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm">{activity.hours} horas</p>
                      </div>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {curriculum.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Experiência Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {curriculum.experience.map((exp: any) => (
                    <li key={exp.id}>
                      <p className="font-medium">{exp.company}</p>
                      <p>{exp.position}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {curriculum.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {curriculum.skills.map((skill: any) => (
                    <span key={skill.id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="hidden">
        <PrintCurriculum ref={printRef} curriculum={curriculum} />
      </div>
    </div>
  )
}
