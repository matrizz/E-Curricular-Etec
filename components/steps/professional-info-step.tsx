"use client"

import type { FormData } from "../multi-step-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfessionalInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function ProfessionalInfoStep({ formData, updateFormData, errors }: ProfessionalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Professional Information</h2>
        <p className="text-muted-foreground mb-6">Tell us about your professional background.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">
            Occupation <span className="text-destructive">*</span>
          </Label>
          <Input
            id="occupation"
            // @ts-expect-error
            value={formData.occupation}
            // @ts-expect-error
            onChange={(e) => updateFormData({ occupation: e.target.value })}
            placeholder="Enter your job title"
            aria-invalid={!!errors.occupation}
            aria-describedby={errors.occupation ? "occupation-error" : undefined}
          />
          {errors.occupation && (
            <p id="occupation-error" className="text-sm text-destructive">
              {errors.occupation}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">
            Company <span className="text-destructive">*</span>
          </Label>
          <Input
            id="company"
            // @ts-expect-error
            value={formData.company}
            // @ts-expect-error
            onChange={(e) => updateFormData({ company: e.target.value })}
            placeholder="Enter your company name"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            />
          {errors.company && (
            <p id="company-error" className="text-sm text-destructive">
              {errors.company}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">
            Experience Level <span className="text-destructive">*</span>
          </Label>
          {/* @ts-expect-error */}
          <Select value={formData.experience} onValueChange={(value) => updateFormData({ experience: value })}>
            <SelectTrigger
              id="experience"
              aria-invalid={!!errors.experience}
              aria-describedby={errors.experience ? "experience-error" : undefined}
            >
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
              <SelectItem value="expert">Expert (10+ years)</SelectItem>
            </SelectContent>
          </Select>
          {errors.experience && (
            <p id="experience-error" className="text-sm text-destructive">
              {errors.experience}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

