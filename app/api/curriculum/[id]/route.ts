import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const curriculum = await prisma.curriculum.findUnique({
      where: { id },
      include: {
        additionalEducation: true,
        extracurricular: true,
        experience: true,
        skills: true,
      },
    })

    if (!curriculum) {
      return NextResponse.json({ success: false, message: "Currículo não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: curriculum,
    })
  } catch (error) {
    console.error("Erro ao buscar currículo:", error)
    return NextResponse.json({ success: false, message: "Erro ao buscar currículo" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    const id = params.id
    const data = await request.json()

    const curriculum = await prisma.curriculum.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!curriculum) {
      return NextResponse.json({ success: false, message: "Currículo não encontrado" }, { status: 404 })
    }

    if (curriculum.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Não autorizado a editar este currículo" }, { status: 403 })
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
    }

    const updatedCurriculum = await prisma.curriculum.update({
      where: { id },
      data: curriculumData,
    })

    await prisma.additionalEducation.deleteMany({
      where: { curriculumId: id },
    })

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        hasCurriculum: true,
      }
    })

    if (data.additionalEducation && data.additionalEducation.length > 0) {
      await Promise.all(
        data.additionalEducation
          .filter((edu: any) => edu.name && edu.name.trim() !== "")
          .map((edu: any) =>
            prisma.additionalEducation.create({
              data: {
                name: edu.name,
                startYear: edu.startYear || "",
                endYear: edu.endYear || null,
                curriculumId: id,
              },
            }),
          ),
      )
    }

    await prisma.extracurricular.deleteMany({
      where: { curriculumId: id },
    })

    if (data.extracurricular && data.extracurricular.length > 0) {
      await Promise.all(
        data.extracurricular
          .filter((activity: any) => activity.name && activity.name.trim() !== "")
          .map((activity: any) =>
            prisma.extracurricular.create({
              data: {
                name: activity.name,
                hours: Number.parseInt(activity.hours) || 0,
                description: activity.description || null,
                curriculumId: id,
              },
            }),
          ),
      )
    }

    await prisma.experience.deleteMany({
      where: { curriculumId: id },
    })

    const experienceEntries = []
    const experienceCount = Object.keys(data.experience).filter((key) => key.startsWith("company")).length

    for (let i = 1; i <= experienceCount; i++) {
      if (data.experience[`company${i}`] && data.experience[`company${i}`].trim() !== "") {
        experienceEntries.push({
          company: data.experience[`company${i}`],
          position: data.experience[`position${i}`] || "",
          period: data.experience[`period${i}`] || "",
          description: data.experience[`description${i}`] || null,
          curriculumId: id,
        })
      }
    }

    if (experienceEntries.length > 0) {
      await Promise.all(
        experienceEntries.map((exp) =>
          prisma.experience.create({
            data: exp,
          }),
        ),
      )
    }

    await prisma.skill.deleteMany({
      where: { curriculumId: id },
    })

    const skillEntries = Object.entries(data.skills)
      .filter(([_, value]) => value === true)
      .map(([key]) => ({
        name: key,
        curriculumId: id,
      }))

    if (skillEntries.length > 0) {
      await Promise.all(
        skillEntries.map((skill) =>
          prisma.skill.create({
            data: skill,
          }),
        ),
      )
    }

    return NextResponse.json({
      success: true,
      message: "Currículo atualizado com sucesso",
      data: updatedCurriculum,
    })
  } catch (error) {
    console.error("Erro ao atualizar currículo:", error)
    return NextResponse.json({ success: false, message: "Erro ao atualizar currículo" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    const id = params.id

    const curriculum = await prisma.curriculum.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!curriculum) {
      return NextResponse.json({ success: false, message: "Currículo não encontrado" }, { status: 404 })
    }

    if (curriculum.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Não autorizado a excluir este currículo" }, { status: 403 })
    }

    await prisma.curriculum.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Currículo excluído com sucesso",
    })
  } catch (error) {
    console.error("Erro ao excluir currículo:", error)
    return NextResponse.json({ success: false, message: "Erro ao excluir currículo" }, { status: 500 })
  }
}

