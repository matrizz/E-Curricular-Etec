"use client"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"

interface AdditionalEducationStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function AdditionalEducationStep({ formData, updateFormData, errors }: AdditionalEducationStepProps) {
  const addEducation = () => {
    const newEducation = [...formData.additionalEducation, { name: "", startYear: "", endYear: "" }]
    updateFormData({ additionalEducation: newEducation })
  }

  const removeEducation = (index: number) => {
    if (formData.additionalEducation.length <= 1) return

    const newEducation = formData.additionalEducation.filter((_, i) => i !== index)
    updateFormData({ additionalEducation: newEducation })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...formData.additionalEducation]
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    }
    updateFormData({ additionalEducation: newEducation })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Outras Formações Acadêmicas</h2>
        <p className="text-muted-foreground mb-6">Adicione outras formações acadêmicas que você possui (opcional).</p>
      </div>

      <div className="space-y-4">
        {formData.additionalEducation.map((education, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Formação {index + 1}</h3>
              {formData.additionalEducation.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => removeEducation(index)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`education-name-${index}`}>Nome do Curso/Formação</Label>
              <Input
                id={`education-name-${index}`}
                value={education.name}
                onChange={(e) => updateEducation(index, "name", e.target.value)}
                placeholder="Ex: Bacharelado em Ciência da Computação"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`education-start-${index}`}>Ano de Início</Label>
                <Input
                  id={`education-start-${index}`}
                  type="number"
                  min="1950"
                  max="2050"
                  value={education.startYear}
                  onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                  placeholder="Ex: 2018"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`education-end-${index}`}>Ano de Término</Label>
                <Input
                  id={`education-end-${index}`}
                  type="number"
                  min="1950"
                  max="2050"
                  value={education.endYear}
                  onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                  placeholder="Ex: 2022 (ou em andamento)"
                />
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addEducation} className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Formação
        </Button>
      </div>
    </div>
  )
}

