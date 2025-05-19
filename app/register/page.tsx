"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { isValidEtecEmail } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    rm: z.string().min(2, "RM deve ter pelo menos 2 caracteres"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine((data) => isValidEtecEmail(data.email), {
    message: "Apenas emails institucionais da ETEC são permitidos",
    path: ["email"],
  })

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rm: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const { status } = useSession()
  const { toast } = useToast()

  useEffect(() => {
      if (status === "loading") return
  
      if (status === "authenticated") {
        router.push("/profile")
        return
      }

      if (status !== "unauthenticated") {
        router.push("/form")
        return
      }
  
    }, [status, router])

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const result = registerSchema.safeParse(formData)
      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message
        })
        setErrors(fieldErrors)
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          rm: formData.rm,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Erro no registro",
          description: data.message || "Ocorreu um erro ao registrar sua conta",
          variant: "destructive",
        })
        if (data.errors) {
          setErrors(data.errors)
        }
        setIsSubmitting(false)
        return
      }

      toast({
        title: "Registro concluído",
        description: "Sua conta foi criada com sucesso. Você já pode fazer login.",
      })

      router.push("/login")
    } catch (error) {
      console.error("Erro ao registrar:", error)
      toast({
        title: "Erro no registro",
        description: "Ocorreu um erro ao registrar sua conta. Tente novamente mais tarde.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Toaster />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>Registre-se para criar e gerenciar seu currículo</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                required
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Institucional</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@etec.sp.gov.br"
                required
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rm">RM (Registro de Matrícula)</Label>
              <Input
                id="rm"
                name="rm"
                value={formData.rm}
                onChange={handleChange}
                placeholder="Digite seu RM"
                required
              />
              {errors.rm && <p className="text-sm text-destructive">{errors.rm}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crie uma senha segura"
                required
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
                required
              />
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

