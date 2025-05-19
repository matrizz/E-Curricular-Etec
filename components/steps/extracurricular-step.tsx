"use client"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ExtracurricularStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function ExtracurricularStep({ formData, updateFormData, errors }: ExtracurricularStepProps) {
  const addActivity = () => {
    const newActivities = [...formData.extracurricular, { name: "", hours: "", description: "" }]
    updateFormData({ extracurricular: newActivities })
  }

  const removeActivity = (index: number) => {
    if (formData.extracurricular.length <= 1) return

    const newActivities = formData.extracurricular.filter((_, i) => i !== index)
    updateFormData({ extracurricular: newActivities })
  }

  const updateActivity = (index: number, field: string, value: string) => {
    const newActivities = [...formData.extracurricular]
    newActivities[index] = {
      ...newActivities[index],
      [field]: value,
    }
    updateFormData({ extracurricular: newActivities })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Atividades Extracurriculares</h2>
        <p className="text-muted-foreground mb-6">
          Adicione atividades extracurriculares que você participou, incluindo o número de horas.
        </p>
      </div>

      <div className="space-y-4">
        {formData.extracurricular.map((activity, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Atividade {index + 1}</h3>
              {formData.extracurricular.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => removeActivity(index)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`activity-name-${index}`}>Nome da Atividade</Label>
              <Input
                id={`activity-name-${index}`}
                value={activity.name}
                onChange={(e) => updateActivity(index, "name", e.target.value)}
                placeholder="Ex: Curso de Inglês, Projeto Voluntário, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`activity-hours-${index}`}>Número de Horas</Label>
              <Input
                id={`activity-hours-${index}`}
                type="number"
                min="1"
                value={activity.hours}
                onChange={(e) => updateActivity(index, "hours", e.target.value)}
                placeholder="Ex: 40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`activity-description-${index}`}>Descrição da Atividade</Label>
              <Textarea
                id={`activity-description-${index}`}
                value={activity.description}
                onChange={(e) => updateActivity(index, "description", e.target.value)}
                placeholder="Descreva brevemente a atividade e o que você aprendeu"
                rows={3}
              />
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addActivity} className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Adicionar Atividade
        </Button>
      </div>
    </div>
  )
}

