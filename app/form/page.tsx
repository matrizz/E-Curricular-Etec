"use client"

import MultiStepForm from "@/components/multi-step-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { status, data } = useSession()
  const router = useRouter()
  

  useEffect(() => {
    if (status === "loading") return
    
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }
    
    if (!data?.user.hasCurriculum) {
      router.push("/form")
      return
    }

  }, [status, router])

  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastro de Currículo</h1>
        <MultiStepForm />
      </div>
    </main>
  )
}