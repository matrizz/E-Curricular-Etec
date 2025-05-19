import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Prisma } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const course = searchParams.get("course") || undefined

    const session = await getServerSession(authOptions)

    if (session?.user.role !== "ADMIN") {
      if (!session) {
        return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
      }

      const userCurriculum = await prisma.curriculum.findUnique({
        where: { userId: session.user.id },
        include: {
          additionalEducation: true,
          extracurricular: true,
          experience: true,
          skills: true,
        },
      })

      return NextResponse.json({
        success: true,
        data: userCurriculum ? [userCurriculum] : [],
      })
    }

    const whereClause: Prisma.CurriculumWhereInput = {}

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { rm: { contains: search } },
      ]
    }

    if (course) {
      whereClause.course = course
    }

    const curricula = await prisma.curriculum.findMany({
      where: whereClause,
      include: {
        additionalEducation: true,
        extracurricular: true,
        experience: true,
        skills: true,
      },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({
      success: true,
      data: curricula,
    })
  } catch (error) {
    console.error("Erro ao buscar currículos:", error)
    return NextResponse.json({ success: false, message: "Erro ao buscar currículos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    const data = await request.json()

    const existingCurriculum = await prisma.curriculum.findUnique({
      where: { userId: session.user.id },
    })

    if (existingCurriculum) {
      return NextResponse.json(
        { success: false, message: "Usuário já possui um currículo cadastrado" },
        { status: 400 },
      )
    }

    const curriculumData = {
      name: data.name,
      email: data.email,
      rm: data.rm,
      phone: data.phone,
      phone2: data.phone2 || null,
      birth: new Date(data.birth),
      image: data.image || null,
      genre: data.genre,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      course: data.course,
      objective: data.objective,
      userId: session.user.id,

      additionalEducation: {
        create: data.additionalEducation
          .filter((edu: any) => edu.name && edu.name.trim() !== "")
          .map((edu: any) => ({
            name: edu.name,
            startYear: edu.startYear || "",
            endYear: edu.endYear || null,
          })),
      },

      extracurricular: {
        create: data.extracurricular
          .filter((activity: any) => activity.name && activity.name.trim() !== "")
          .map((activity: any) => ({
            name: activity.name,
            hours: Number.parseInt(activity.hours) || 0,
            description: activity.description || null,
          })),
      },

      skills: {
        create: Object.entries(data.skills)
          .filter(([_, value]) => value === true)
          .map(([key]) => ({
            name: key,
          })),
      },
    }

    const experienceEntries = []
    const experienceCount = Object.keys(data.experience).filter((key) => key.startsWith("company")).length

    for (let i = 1; i <= experienceCount; i++) {
      if (data.experience[`company${i}`] && data.experience[`company${i}`].trim() !== "") {
        experienceEntries.push({
          company: data.experience[`company${i}`],
          position: data.experience[`position${i}`] || "",
          period: data.experience[`period${i}`] || "",
          description: data.experience[`description${i}`] || null,
        })
      }
    }

    if (experienceEntries.length > 0) {
      // @ts-expect-error
      curriculumData.experience = {
        create: experienceEntries,
      }
    }

    const curriculum = await prisma.curriculum.create({
      data: curriculumData,
      include: {
        additionalEducation: true,
        extracurricular: true,
        experience: true,
        skills: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Currículo salvo com sucesso!",
      data: curriculum,
    })
  } catch (error: any) {
    console.error("Erro ao salvar currículo:", error)

    if (error.code === "P2002") {
      const field = error.meta?.target[0]
      let message = "Já existe um registro com este valor."

      if (field === "email") {
        message = "Este email já está cadastrado."
      } else if (field === "rm") {
        message = "Este RM já está cadastrado."
      } else if (field === "phone") {
        message = "Este telefone já está cadastrado."
      }

      return NextResponse.json({ success: false, message, field }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Erro ao salvar o currículo." }, { status: 500 })
  }
}

