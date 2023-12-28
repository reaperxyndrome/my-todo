import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
// import { getUser } from '../utils'

// POST /api/task
// Required fields in body: title, description, date, time, complete

export async function POST(
  req: NextRequest
) {
    try {
        const { username, email, password: raw_pass } = await req.json()
        console.log(raw_pass)
        const password = await hash(raw_pass, 12)
        const result = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            },
        })
        console.log(result)
        return NextResponse.json(result)
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred while creating the task' })
    }
}
