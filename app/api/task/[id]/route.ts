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
    const response = NextResponse.json({message: "Task deleted successfully:", task: deleted})
    console.log(response.status)
    return response
  } catch (error) {
    // Handle error
    console.error(error)
    return NextResponse.json({error: 'Failed to delete task' })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
  ) {
  const {title, description, date, time, complete } = await req.json();
  try {
    const result = await prisma.task.update({
      where: {id: params.id},
      data: {
        title: title,
        description: description,
        date: date,
        time: time,
        complete: complete,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error occurred while updating the task' });
  }
}