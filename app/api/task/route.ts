import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '../utils'

// POST /api/task
// Required fields in body: title, description, date, time, complete

export async function POST(
  req: NextRequest
) {
  try {
    const {userId} = await getUser()
    const { title, description, date, time, complete } = await req.json()
    const result = await prisma.task.create({
      data: {
          title: title,
          description: description,
          date: date,
          time: time,
          complete: complete,
          userId: userId
      },
    })
    // console.log(NextResponse.json(result).status)
    return NextResponse.json(result)
  }
  catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'An error occurred while creating the task' })
  }
}


export async function GET() {
  try {
    const {userId} = await getUser()
    const tasks = await prisma.task.findMany({
      where: {
        complete: false,
        userId: userId,
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while fetching the tasks' });
  }
}