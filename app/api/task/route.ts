import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/task
// Required fields in body: title, description, date, time, complete
export async function POST(
  req: NextRequest
) {
  // console.log(req.body)
  // const request = await req.json()
  // console.log(request)
  const { title, description, date, time, complete } = await req.json()
  try {
    const result = await prisma.task.create({
      data: {
          title: title,
          description: description,
          date: date,
          time: time,
          complete: complete,
      },
    })
    console.log(NextResponse.json(result).status)
    return NextResponse.json(result)
  }
  catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'An error occurred while creating the task' })
  }
}

