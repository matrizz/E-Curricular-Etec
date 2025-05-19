"use client"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ContactDetailsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function ContactDetailsStep({ formData, updateFormData, errors }: ContactDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
        <p className="text-muted-foreground mb-6">Please provide your contact information so we can reach you.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="Enter your phone number"
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
          <Label htmlFor="address">
            Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            // @ts-expect-error
            value={formData.address}
            // @ts-expect-error
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="Enter your street address"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            />
          {errors.address && (
            <p id="address-error" className="text-sm text-destructive">
              {errors.address}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              placeholder="Enter your city"
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
            <Label htmlFor="zipCode">
              Zip Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="zipCode"
              // @ts-expect-error
              value={formData.zipCode}
              // @ts-expect-error
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              placeholder="Enter your zip code"
              aria-invalid={!!errors.zipCode}
              aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
            />
            {errors.zipCode && (
              <p id="zipCode-error" className="text-sm text-destructive">
                {errors.zipCode}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

