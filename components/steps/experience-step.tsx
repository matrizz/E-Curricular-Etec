"use client"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"

interface ExperienceStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function ExperienceStep({ formData, updateFormData, errors }: ExperienceStepProps) {
  const [experienceCount, setExperienceCount] = useState(1)

  const handleExperienceChange = (key: string, value: string) => {
    updateFormData({
      experience: {
        ...formData.experience,
        [key]: value,
      },
    })
  }

  const addExperience = () => {
    const newCount = experienceCount + 1
    setExperienceCount(newCount)

    updateFormData({
      experience: {
        ...formData.experience,
        [`company${newCount}`]: "",
        [`position${newCount}`]: "",
        [`period${newCount}`]: "",
        [`description${newCount}`]: "",
      },
    })
  }

  const removeExperience = (index: number) => {
    if (experienceCount <= 1) return

    const newExperience = { ...formData.experience }

    delete newExperience[`company${index}`]
    delete newExperience[`position${index}`]
    delete newExperience[`period${index}`]
    delete newExperience[`description${index}`]

    const updatedExperience: Record<string, string> = {}
    let newIndex = 1

    for (let i = 1; i <= experienceCount; i++) {
      if (i !== index) {
        if (newExperience[`company${i}`] !== undefined) {
          updatedExperience[`company${newIndex}`] = newExperience[`company${i}`]
          updatedExperience[`position${newIndex}`] = newExperience[`position${i}`]
          updatedExperience[`period${newIndex}`] = newExperience[`period${i}`]
          updatedExperience[`description${newIndex}`] = newExperience[`description${i}`]
          newIndex++
        }
      }
    }

    updateFormData({ experience: updatedExperience })
    setExperienceCount(experienceCount - 1)
  }

  const renderExperienceFields = () => {
    const fields = []

    for (let i = 1; i <= experienceCount; i++) {
      fields.push(
        <div key={i} className="space-y-4 p-4 border rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Experiência {i}</h3>
            {experienceCount > 1 && (
              <Button variant="ghost" size="sm" onClick={() => removeExperience(i)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-1" />
                Remover
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`company${i}`}>Empresa</Label>
            <Input
              id={`company${i}`}
              value={formData.experience[`company${i}`] || ""}
              onChange={(e) => handleExperienceChange(`company${i}`, e.target.value)}
              placeholder="Nome da empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`position${i}`}>Cargo</Label>
            <Input
              id={`position${i}`}
              value={formData.experience[`position${i}`] || ""}
              onChange={(e) => handleExperienceChange(`position${i}`, e.target.value)}
              placeholder="Seu cargo na empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`period${i}`}>Período</Label>
            <Input
              id={`period${i}`}
              value={formData.experience[`period${i}`] || ""}
              onChange={(e) => handleExperienceChange(`period${i}`, e.target.value)}
              placeholder="Ex: Jan 2020 - Dez 2022"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description${i}`}>Descrição das Atividades</Label>
            <Textarea
              id={`description${i}`}
              value={formData.experience[`description${i}`] || ""}
              onChange={(e) => handleExperienceChange(`description${i}`, e.target.value)}
              placeholder="Descreva suas principais atividades e responsabilidades"
              rows={3}
            />
          </div>
        </div>,
      )
    }

    return fields
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Experiência Profissional</h2>
        <p className="text-muted-foreground mb-6">Informe suas experiências profissionais anteriores.</p>
      </div>

      <div className="space-y-4">
        {renderExperienceFields()}

        <Button type="button" variant="outline" onClick={addExperience} className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Experiência
        </Button>
      </div>
    </div>
  )
}

