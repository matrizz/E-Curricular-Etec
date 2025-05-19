"use client"

import type { FormData } from "../multi-step-form"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PreferencesStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  errors: Record<string, string>
}

export default function PreferencesStep({ formData, updateFormData, errors }: PreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Preferences</h2>
        <p className="text-muted-foreground mb-6">Customize your experience by setting your preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme Preference</h3>
          <RadioGroup
          // @ts-expect-error
          value={formData.theme}
          // @ts-expect-error
          onValueChange={(value) => updateFormData({ theme: value as "light" | "dark" | "system" })}
          className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system">System Default</Label>
            </div>
          </RadioGroup>
          {errors.theme && <p className="text-sm text-destructive">{errors.theme}</p>}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Communication Preferences</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications about account activity</p>
            </div>
            <Switch
              id="notifications"
              // @ts-expect-error
              checked={formData.notifications}
              // @ts-expect-error
              onCheckedChange={(checked) => updateFormData({ notifications: checked })}
              />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="updates">Product Updates</Label>
              <p className="text-sm text-muted-foreground">Receive updates about new features and improvements</p>
            </div>
            <Switch
              id="updates"
              // @ts-expect-error
              checked={formData.updates}
              // @ts-expect-error
              onCheckedChange={(checked) => updateFormData({ updates: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

