"use client"

import type { FormData } from "../multi-step-form"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface SkillsObjectivesStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function SkillsObjectivesStep({ formData, updateFormData, errors }: SkillsObjectivesStepProps) {
  const handleSkillChange = (key: string, checked: boolean) => {
    updateFormData({
      skills: {
        ...formData.skills,
        [key]: checked,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Habilidades e Objetivos</h2>
        <p className="text-muted-foreground mb-6">Informe suas habilidades e objetivos profissionais.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Habilidades</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skill-comunicacao"
                checked={formData.skills.comunicacao}
                onCheckedChange={(checked) => handleSkillChange("comunicacao", checked === true)}
              />
              <Label htmlFor="skill-comunicacao" className="font-normal">
                Comunicação
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skill-trabalho-em-equipe"
                checked={formData.skills.trabalho_em_equipe}
                onCheckedChange={(checked) => handleSkillChange("trabalho_em_equipe", checked === true)}
              />
              <Label htmlFor="skill-trabalho-em-equipe" className="font-normal">
                Trabalho em Equipe
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skill-lideranca"
                checked={formData.skills.lideranca}
                onCheckedChange={(checked) => handleSkillChange("lideranca", checked === true)}
              />
              <Label htmlFor="skill-lideranca" className="font-normal">
                Liderança
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skill-resolucao-problemas"
                checked={formData.skills.resolucao_problemas}
                onCheckedChange={(checked) => handleSkillChange("resolucao_problemas", checked === true)}
              />
              <Label htmlFor="skill-resolucao-problemas" className="font-normal">
                Resolução de Problemas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skill-adaptabilidade"
                checked={formData.skills.adaptabilidade}
                onCheckedChange={(checked) => handleSkillChange("adaptabilidade", checked === true)}
              />
              <Label htmlFor="skill-adaptabilidade" className="font-normal">
                Adaptabilidade
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="skill-criatividade"
                checked={formData.skills.criatividade}
                onCheckedChange={(checked) => handleSkillChange("criatividade", checked === true)}
              />
              <Label htmlFor="skill-criatividade" className="font-normal">
                Criatividade
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">
            Objetivo Profissional <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="objective"
            value={formData.objective}
            onChange={(e) => updateFormData({ objective: e.target.value })}
            placeholder="Descreva seus objetivos profissionais"
            rows={5}
            aria-invalid={!!errors.objective}
            aria-describedby={errors.objective ? "objective-error" : undefined}
          />
          {errors.objective && (
            <p id="objective-error" className="text-sm text-destructive">
              {errors.objective}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

