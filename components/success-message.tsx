"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { FormData } from "./multi-step-form"
import Link from "next/link"

interface SuccessMessageProps {
  formData: FormData
  curriculumId?: string
  isEditing?: boolean
}

export default function SuccessMessage({ formData, curriculumId, isEditing = false }: SuccessMessageProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>

        <h2 className="text-2xl font-bold mb-2">
          {isEditing ? "Currículo Atualizado com Sucesso!" : "Currículo Enviado com Sucesso!"}
        </h2>

        <p className="text-muted-foreground mb-6 max-w-md">
          Obrigado, {formData.name}! Seu currículo foi {isEditing ? "atualizado" : "enviado"} e salvo no banco de dados
          com sucesso.
        </p>

        <div className="w-full max-w-sm p-4 bg-muted rounded-lg mb-6">
          <p className="font-medium">Detalhes do {isEditing ? "Atualização" : "Envio"}</p>
          <p className="text-sm text-muted-foreground">
            Um email de confirmação foi enviado para <span className="font-medium">{formData.email}</span>
          </p>
          {curriculumId && (
            <p className="text-sm text-muted-foreground mt-2">
              ID do Currículo: <span className="font-medium">{curriculumId}</span>
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/profile">Ir para Meu Perfil</Link>
          </Button>
          {curriculumId && (
            <Button asChild>
              <Link href={`/curriculum/${curriculumId}`}>Visualizar Currículo</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

