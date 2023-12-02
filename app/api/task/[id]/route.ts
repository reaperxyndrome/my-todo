import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma' // import prisma instance

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const deleted = await prisma.task.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({message: "Task deleted successfully:", task: deleted})
  } catch (error) {
    // Handle error
    console.error(error)
    return NextResponse.json({error: 'Failed to delete task' }).status
  }
}