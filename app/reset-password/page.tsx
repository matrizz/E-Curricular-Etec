"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()
  const { toast } = useToast()

  const [requestData, setRequestData] = useState({
    email: "",
    rm: "",
  })

  const [resetData, setResetData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleRequestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRequestData((prev) => ({ ...prev, [name]: value }))
  }

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setResetData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      if (!requestData.email || !requestData.rm) {
        setErrors({
          form: "Email e RM são obrigatórios",
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Erro na solicitação",
          description: data.message || "Ocorreu um erro ao solicitar redefinição de senha",
          variant: "destructive",
        })
        if (data.errors) {
          setErrors(data.errors)
        }
        setIsSubmitting(false)
        return
      }

      toast({
        title: "Solicitação enviada",
        description: "Verifique seu email para redefinir sua senha",
      })

      router.push(`/reset-password?token=${data.token}`)
    } catch (error) {
      console.error("Erro ao solicitar reset:", error)
      toast({
        title: "Erro na solicitação",
        description: "Ocorreu um erro ao solicitar redefinição de senha. Tente novamente mais tarde.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      if (resetData.password !== resetData.confirmPassword) {
        setErrors({
          confirmPassword: "As senhas não coincidem",
        })
        setIsSubmitting(false)
        return
      }

      if (resetData.password.length < 6) {
        setErrors({
          password: "A senha deve ter pelo menos 6 caracteres",
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: resetData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Erro na redefinição",
          description: data.message || "Ocorreu um erro ao redefinir sua senha",
          variant: "destructive",
        })
        if (data.errors) {
          setErrors(data.errors)
        }
        setIsSubmitting(false)
        return
      }

      toast({
        title: "Senha redefinida",
        description: "Sua senha foi redefinida com sucesso. Você já pode fazer login.",
      })

      router.push("/login")
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      toast({
        title: "Erro na redefinição",
        description: "Ocorreu um erro ao redefinir sua senha. Tente novamente mais tarde.",
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
          <CardTitle className="text-2xl">{token ? "Redefinir Senha" : "Recuperar Senha"}</CardTitle>
          <CardDescription>
            {token ? "Digite sua nova senha" : "Informe seu email e RM para recuperar sua senha"}
          </CardDescription>
        </CardHeader>

        {token ? (
          <form onSubmit={handleResetSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={resetData.password}
                  onChange={handleResetChange}
                  placeholder="Digite sua nova senha"
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
                  value={resetData.confirmPassword}
                  onChange={handleResetChange}
                  placeholder="Confirme sua nova senha"
                  required
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                <Link href="/login" className="text-primary underline">
                  Voltar para o login
                </Link>
              </p>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleRequestSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={requestData.email}
                  onChange={handleRequestChange}
                  placeholder="seu.email@etec.sp.gov.br"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rm">RM (Registro de Matrícula)</Label>
                <Input
                  id="rm"
                  name="rm"
                  value={requestData.rm}
                  onChange={handleRequestChange}
                  placeholder="Digite seu RM"
                  required
                />
              </div>

              {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Link de Recuperação"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                <Link href="/login" className="text-primary underline">
                  Voltar para o login
                </Link>
              </p>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}

