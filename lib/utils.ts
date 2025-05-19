import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEtecEmail(email: string) {
  return email.endsWith("@etec.sp.gov.br")
}

export function generateRandomPassword(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
  let password = ""
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export function formatDate(date: Date | string) {
  if (!date) return ""
  const d = new Date(date)
  return d.toLocaleDateString("pt-BR", { timeZone: "UTC" })
}

export function getCourseFullName(courseCode: string): string {
  const courses: Record<string, string> = {
    MIN: "Informática para Internet",
    MAM: "Meio Ambiente",
    MAD: "Administração",
    DS: "Desenvolvimento de Sistemas",
    FAR: "Farmácia",
  }
  return courses[courseCode] || courseCode
}

