"use client"

import type { FormData } from "../multi-step-form"

interface ReviewStepProps {
  formData: FormData
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  const getCourseFullName = (courseCode: string): string => {
    const courses: Record<string, string> = {
      MIN: "Informática para Internet",
      MAM: "Meio Ambiente",
      MAD: "Administração",
      DS: "Desenvolvimento de Sistemas",
      FAR: "Farmácia",
    }
    return `${courseCode} - ${courses[courseCode] || courseCode}`
  }

  const formatGenre = (genre: string): string => {
    const genres: Record<string, string> = {
      masculino: "Masculino",
      feminino: "Feminino",
      outro: "Outro",
      prefiro_nao_informar: "Prefiro não informar",
    }
    return genres[genre] || genre
  }

  const sections = [
    {
      title: "Informações Pessoais",
      fields: [
        { label: "Nome", value: formData.name },
        { label: "RM", value: formData.rm },
        { label: "Data de Nascimento", value: formData.birth },
        { label: "Gênero", value: formatGenre(formData.genre) },
      ],
    },
    {
      title: "Contato e Endereço",
      fields: [
        { label: "Email", value: formData.email },
        { label: "Telefone Principal", value: formData.phone },
        { label: "Telefone Secundário", value: formData.phone2 || "Não informado" },
        { label: "Endereço", value: formData.street },
        { label: "Cidade", value: formData.city },
        { label: "Estado", value: formData.state },
        { label: "CEP", value: formData.zip },
      ],
    },
    {
      title: "Formação ETEC",
      fields: [{ label: "Curso", value: formData.course ? getCourseFullName(formData.course) : "Não informado" }],
    },
    {
      title: "Outras Formações",
      fields:
        formData.additionalEducation.length > 0 && formData.additionalEducation[0].name
          ? formData.additionalEducation.map((edu, index) => ({
              label: `Formação ${index + 1}`,
              value: `${edu.name} (${edu.startYear || "?"} - ${edu.endYear || "atual"})`,
            }))
          : [{ label: "Outras Formações", value: "Não informado" }],
    },
    {
      title: "Atividades Extracurriculares",
      fields:
        formData.extracurricular.length > 0 && formData.extracurricular[0].name
          ? formData.extracurricular
              .flatMap((activity, index) => [
                {
                  label: `Atividade ${index + 1}`,
                  value: `${activity.name} (${activity.hours || "0"} horas)`,
                },
                activity.description
                  ? {
                      label: `Descrição ${index + 1}`,
                      value: activity.description,
                    }
                  : null,
              ])
              .filter(Boolean)
          : [{ label: "Atividades Extracurriculares", value: "Não informado" }],
    },
    {
      title: "Experiência Profissional",
      fields: getExperienceFields(formData.experience),
    },
    {
      title: "Habilidades e Objetivos",
      fields: [
        {
          label: "Habilidades",
          value:
            Object.entries(formData.skills)
              .filter(([_, value]) => value)
              .map(([key]) => formatKey(key))
              .join(", ") || "Não informado",
        },
        { label: "Objetivo Profissional", value: formData.objective },
      ],
    },
  ]

  function formatKey(key: string): string {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  function getExperienceFields(experience: Record<string, string>): { label: string; value: string }[] {
    const fields: { label: string; value: string }[] = []
    const experienceCount = Object.keys(experience).filter((key) => key.startsWith("company")).length

    for (let i = 1; i <= experienceCount; i++) {
      if (experience[`company${i}`]) {
        fields.push({
          label: `Experiência ${i}`,
          value: `${experience[`company${i}`] || ""} - ${experience[`position${i}`] || ""} (${experience[`period${i}`] || ""})`,
        })

        if (experience[`description${i}`]) {
          fields.push({
            label: `Descrição ${i}`,
            value: experience[`description${i}`],
          })
        }
      }
    }

    return fields.length > 0 ? fields : [{ label: "Experiência", value: "Não informado" }]
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Revisão do Currículo</h2>
        <p className="text-muted-foreground mb-6">Por favor, revise suas informações antes de enviar o currículo.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-medium border-b pb-2">{section.title}</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2">
              {section.fields.map(
                (field, fieldIndex) =>
                  field && (
                    <div key={fieldIndex} className="space-y-1">
                      <dt className="text-sm text-muted-foreground">{field.label}</dt>
                      <dd className="font-medium">{field.value}</dd>
                    </div>
                  ),
              )}
            </dl>
          </div>
        ))}
      </div>

      {formData.image && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium border-b pb-2">Foto de Perfil</h3>
          <div className="flex justify-center">
            <img
              src={formData.image || "/placeholder.svg"}
              alt="Foto de Perfil"
              className="w-32 h-32 object-cover rounded-md border"
            />
          </div>
        </div>
      )}
    </div>
  )
}

