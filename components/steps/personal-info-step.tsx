"use client"

import type React from "react"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

interface PersonalInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function PersonalInfoStep({ formData, updateFormData, errors }: PersonalInfoStepProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(formData.image || null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        updateFormData({ image: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Informações Pessoais</h2>
        <p className="text-muted-foreground mb-6">Por favor, forneça suas informações pessoais básicas.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nome Completo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Digite seu nome completo"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rm">
            RM (Registro de Matrícula) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="rm"
            value={formData.rm}
            onChange={(e) => updateFormData({ rm: e.target.value })}
            placeholder="Digite seu RM"
            aria-invalid={!!errors.rm}
            aria-describedby={errors.rm ? "rm-error" : undefined}
          />
          {errors.rm && (
            <p id="rm-error" className="text-sm text-destructive">
              {errors.rm}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth">
            Data de Nascimento <span className="text-destructive">*</span>
          </Label>
          <Input
            id="birth"
            type="date"
            value={formData.birth}
            onChange={(e) => updateFormData({ birth: e.target.value })}
            aria-invalid={!!errors.birth}
            aria-describedby={errors.birth ? "birth-error" : undefined}
          />
          {errors.birth && (
            <p id="birth-error" className="text-sm text-destructive">
              {errors.birth}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Foto de Perfil</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">
            Gênero <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            id="genre"
            value={formData.genre}
            onValueChange={(value) => updateFormData({ genre: value })}
            aria-invalid={!!errors.genre}
            aria-describedby={errors.genre ? "genre-error" : undefined}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="masculino" id="genre-masculino" />
              <Label htmlFor="genre-masculino" className="font-normal">
                Masculino
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feminino" id="genre-feminino" />
              <Label htmlFor="genre-feminino" className="font-normal">
                Feminino
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outro" id="genre-outro" />
              <Label htmlFor="genre-outro" className="font-normal">
                Outro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefiro_nao_informar" id="genre-prefiro-nao-informar" />
              <Label htmlFor="genre-prefiro-nao-informar" className="font-normal">
                Prefiro não informar
              </Label>
            </div>
          </RadioGroup>
          {errors.genre && (
            <p id="genre-error" className="text-sm text-destructive">
              {errors.genre}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

