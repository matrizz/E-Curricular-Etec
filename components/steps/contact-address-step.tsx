"use client"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactAddressStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function ContactAddressStep({ formData, updateFormData, errors }: ContactAddressStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contato e Endereço</h2>
        <p className="text-muted-foreground mb-6">Forneça suas informações de contato e endereço.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="Digite seu email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Telefone Principal <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="Digite seu telefone principal"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone2">Telefone Secundário</Label>
          <Input
            id="phone2"
            type="tel"
            value={formData.phone2}
            onChange={(e) => updateFormData({ phone2: e.target.value })}
            placeholder="Digite seu telefone secundário (opcional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">
            Endereço <span className="text-destructive">*</span>
          </Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => updateFormData({ street: e.target.value })}
            placeholder="Digite seu endereço"
            aria-invalid={!!errors.street}
            aria-describedby={errors.street ? "street-error" : undefined}
          />
          {errors.street && (
            <p id="street-error" className="text-sm text-destructive">
              {errors.street}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              Cidade <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              placeholder="Digite sua cidade"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
            {errors.city && (
              <p id="city-error" className="text-sm text-destructive">
                {errors.city}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">
              Estado <span className="text-destructive">*</span>
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              placeholder="Digite seu estado"
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? "state-error" : undefined}
            />
            {errors.state && (
              <p id="state-error" className="text-sm text-destructive">
                {errors.state}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zip">
            CEP <span className="text-destructive">*</span>
          </Label>
          <Input
            id="zip"
            value={formData.zip}
            onChange={(e) => updateFormData({ zip: e.target.value })}
            placeholder="Digite seu CEP"
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? "zip-error" : undefined}
          />
          {errors.zip && (
            <p id="zip-error" className="text-sm text-destructive">
              {errors.zip}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

