"use client"

import { CheckCircle2 } from "lucide-react"

interface FormProgressProps {
  steps: string[]
  currentStep: number
}

export default function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <div className="w-full mb-8">
      <div className="hidden md:flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10
                  ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary/20 border-2 border-primary text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
              >
                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <span>{index + 1}</span>}
              </div>

              <span className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {step}
              </span>

              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-[50%] w-[calc(100%-2rem)] h-[2px] -translate-y-1/2
                    ${index < currentStep ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile progress indicator */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">
            Etapa {currentStep + 1} de {steps.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{steps[currentStep]}</span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

