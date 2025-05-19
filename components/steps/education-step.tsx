"use client"

import type { FormData } from "../multi-step-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface EducationStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function EducationStep({ formData, updateFormData, errors }: EducationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Formação ETEC</h2>
        <p className="text-muted-foreground mb-6">Selecione o curso da ETEC que você está cursando ou concluiu.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="course">
            Curso ETEC <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            id="course"
            value={formData.course}
            onValueChange={(value) => updateFormData({ course: value })}
            aria-invalid={!!errors.course}
            aria-describedby={errors.course ? "course-error" : undefined}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MIN" id="course-min" />
              <Label htmlFor="course-min" className="font-normal">
                MIN - Informática para Internet
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MAM" id="course-mam" />
              <Label htmlFor="course-mam" className="font-normal">
                MAM - Meio Ambiente
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MAD" id="course-mad" />
              <Label htmlFor="course-mad" className="font-normal">
                MAD - Administração
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DS" id="course-ds" />
              <Label htmlFor="course-ds" className="font-normal">
                DS - Desenvolvimento de Sistemas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="FAR" id="course-far" />
              <Label htmlFor="course-far" className="font-normal">
                FAR - Farmácia
              </Label>
            </div>
          </RadioGroup>
          {errors.course && (
            <p id="course-error" className="text-sm text-destructive">
              {errors.course}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

