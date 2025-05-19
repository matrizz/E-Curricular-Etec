"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FormProgress from "./form-progress"
import PersonalInfoStep from "./steps/personal-info-step"
import ContactAddressStep from "./steps/contact-address-step"
import EducationStep from "./steps/education-step"
import AdditionalEducationStep from "./steps/additional-education-step"
import ExtracurricularStep from "./steps/extracurricular-step"
import ExperienceStep from "./steps/experience-step"
import SkillsObjectivesStep from "./steps/skills-objectives-step"
import ReviewStep from "./steps/review-step"
import SuccessMessage from "./success-message"
import { Toaster } from "./ui/toaster"

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  rm: z.string().min(2, "RM deve ter pelo menos 2 caracteres"),
  birth: z.string().min(1, "Data de nascimento é obrigatória"),
  image: z.string().optional(),
  genre: z.string().min(1, "Selecione um gênero"),
})

export const contactAddressSchema = z.object({
  email: z.string().email("Por favor, insira um email válido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  phone2: z.string().optional(),
  street: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  zip: z.string().min(5, "CEP deve ter pelo menos 5 caracteres"),
})

export const educationSchema = z.object({
  course: z.string().min(1, "Selecione um curso"),
})

export const additionalEducationSchema = z.object({
  additionalEducation: z
    .array(
      z.object({
        name: z.string().optional(),
        startYear: z.string().optional(),
        endYear: z.string().optional(),
      }),
    )
    .optional(),
})

export const extracurricularSchema = z.object({
  extracurricular: z
    .array(
      z.object({
        name: z.string().optional(),
        hours: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
})

export const experienceSchema = z.object({
  experience: z.record(z.string()).optional(),
})

export const skillsObjectivesSchema = z.object({
  skills: z.record(z.boolean()).optional(),
  objective: z.string().min(10, "Objetivo deve ter pelo menos 10 caracteres"),
})

export type FormData = {
  name: string
  email: string
  rm: string
  phone: string
  phone2: string
  birth: string
  image: string
  genre: string
  street: string
  city: string
  state: string
  zip: string
  course: string
  additionalEducation: Array<{
    name: string
    startYear: string
    endYear: string
  }>
  extracurricular: Array<{
    name: string
    hours: string
    description: string
  }>
  experience: Record<string, string>
  degree: Record<string, boolean>
  skills: Record<string, boolean>
  objective: string
}

const STEPS = [
  "Informações Pessoais",
  "Contato e Endereço",
  "Formação ETEC",
  "Outras Formações",
  "Atividades Extracurriculares",
  "Experiência Profissional",
  "Habilidades e Objetivos",
  "Revisão e Envio",
]

interface MultiStepFormProps {
  initialData?: FormData
  curriculumId?: string
  isEditing?: boolean
}

export default function MultiStepForm({ initialData, curriculumId, isEditing = false }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      name: "",
      email: "",
      rm: "",
      phone: "",
      phone2: "",
      birth: "",
      image: "",
      genre: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      course: "",
      additionalEducation: [{ name: "", startYear: "", endYear: "" }],
      extracurricular: [{ name: "", hours: "", description: "" }],
      experience: {
        company1: "",
        position1: "",
        period1: "",
        description1: "",
      },
      degree: {
        ensino_medio: false,
        graduacao: false,
        pos_graduacao: false,
        mestrado: false,
        doutorado: false,
      },
      skills: {
        comunicacao: false,
        trabalho_em_equipe: false,
        lideranca: false,
        resolucao_problemas: false,
        adaptabilidade: false,
        criatividade: false,
      },
      objective: "",
    },
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = () => {
    try {
      switch (currentStep) {
        case 0:
          personalInfoSchema.parse({
            name: formData.name,
            rm: formData.rm,
            birth: formData.birth,
            image: formData.image,
            genre: formData.genre,
          })
          break
        case 1:
          contactAddressSchema.parse({
            email: formData.email,
            phone: formData.phone,
            phone2: formData.phone2,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          })
          break
        case 2:
          educationSchema.parse({
            course: formData.course,
          })
          break
        case 3:
          additionalEducationSchema.parse({
            additionalEducation: formData.additionalEducation,
          })
          break
        case 4:
          extracurricularSchema.parse({
            extracurricular: formData.extracurricular,
          })
          break
        case 5:
          experienceSchema.parse({
            experience: formData.experience,
          })
          break
        case 6:
          skillsObjectivesSchema.parse({
            skills: formData.skills,
            objective: formData.objective,
          })
          break
        default:
          return true
      }
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo(0, 0)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true)

      try {
        const url = isEditing && curriculumId ? `/api/curriculum/${curriculumId}` : "/api/curriculum"

        const method = isEditing ? "PUT" : "POST"

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || `Erro ao ${isEditing ? "atualizar" : "enviar"} o currículo`)
        }

        setSubmittedData(result.data)
        setIsSubmitted(true)
        window.scrollTo(0, 0)

        toast({
          title: isEditing ? "Currículo atualizado com sucesso!" : "Currículo enviado com sucesso!",
          description: isEditing
            ? "Seus dados foram atualizados no banco de dados."
            : "Seus dados foram salvos no banco de dados.",
        })

        setTimeout(() => {
          router.push("/profile")
        }, 3000)
      } catch (error: any) {
        toast({
          title: isEditing ? "Falha na atualização" : "Falha no envio",
          description:
            error.message ||
            `Ocorreu um erro ao ${isEditing ? "atualizar" : "enviar"} seu currículo. Por favor, tente novamente.`,
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 1:
        return <ContactAddressStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 2:
        return <EducationStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 3:
        return <AdditionalEducationStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 4:
        return <ExtracurricularStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 5:
        return <ExperienceStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 6:
        return <SkillsObjectivesStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 7:
        return <ReviewStep formData={formData} />
      default:
        return null
    }
  }

  if (isSubmitted) {
    return <SuccessMessage formData={formData} curriculumId={submittedData?.id || curriculumId} isEditing={isEditing} />
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <FormProgress steps={STEPS} currentStep={currentStep} />

      <Card>
        <CardContent className="pt-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Anterior
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button onClick={handleNext}>Próximo</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : isEditing ? "Atualizar Currículo" : "Enviar Currículo"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

