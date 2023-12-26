
import prisma from '@/lib/prisma'
import {NextResponse } from 'next/server'
import { getUser } from '../../utils';
export async function GET() {
    try {
      const {userId} = await getUser()
      const count_complete = await prisma.task.count({
        where: {
          complete: true,
          userId: userId,
        },
      });
      const res = NextResponse.json(count_complete)
      console.log("Task completed: ", count_complete) 
      return res;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'An error occurred while fetching the tasks' });
    }
  }