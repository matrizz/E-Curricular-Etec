//***** PRODUCTION ONLY *****//

    // @ts-nocheck

//***** PRODUCTION ONLY *****//
"use client"


import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import MultiStepForm from "@/components/multi-step-form"
import { Toaster } from "@/components/ui/toaster"

export default function EditCurriculumPage({ params }: { params: { id: string } }) {
  const { id } = useParams()
  const { data: session, status } = useSession()
  const [curriculum, setCurriculum] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<any>(null)
  const router = useRouter()
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

        const formattedData = {
          name: data.data.name,
          email: data.data.email,
          rm: data.data.rm,
          phone: data.data.phone,
          phone2: data.data.phone2 || "",
          birth: new Date(data.data.birth).toISOString().split("T")[0],
          image: data.data.image || "",
          genre: data.data.genre,
          street: data.data.street,
          city: data.data.city,
          state: data.data.state,
          zip: data.data.zip,
          course: data.data.course,
          objective: data.data.objective,
          additionalEducation:
            data.data.additionalEducation.length > 0
              ? data.data.additionalEducation.map((edu: any) => ({
                name: edu.name,
                startYear: edu.startYear,
                endYear: edu.endYear || "",
              }))
              : [{ name: "", startYear: "", endYear: "" }],
          extracurricular:
            data.data.extracurricular.length > 0
              ? data.data.extracurricular.map((activity: any) => ({
                name: activity.name,
                hours: activity.hours.toString(),
                description: activity.description || "",
              }))
              : [{ name: "", hours: "", description: "" }],
          experience: {},
          skills: {
            comunicacao: false,
            trabalho_em_equipe: false,
            lideranca: false,
            resolucao_problemas: false,
            adaptabilidade: false,
            criatividade: false,
          },
          degree: {
            ensino_medio: false,
            graduacao: false,
            pos_graduacao: false,
            mestrado: false,
            doutorado: false,
          },
        }

        data.data.experience.forEach((exp: any, index: number) => {
          formattedData.experience[`company${index + 1}`] = exp.company
          formattedData.experience[`position${index + 1}`] = exp.position
          formattedData.experience[`period${index + 1}`] = exp.period
          formattedData.experience[`description${index + 1}`] = exp.description || ""
        })

        data.data.skills.forEach((skill: any) => {
          formattedData.skills[skill.name] = true
        })

        setFormData(formattedData)
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

  if (isLoading || !formData) {
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
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Currículo</h1>
      <MultiStepForm initialData={formData} curriculumId={id} isEditing={true} />
    </div>
  )
}

