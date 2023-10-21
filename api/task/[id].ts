import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const taskId = String(req.query.id)

  switch (req.method) {
    case 'GET':
      return handleGET(taskId, res)

    case 'PUT': handlePUT(taskId, req, res)

    case 'DELETE':
      return handleDELETE(taskId, res)

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      )
  }
}

// GET /api/post/:id
async function handleGET(taskId: string, res: NextApiResponse<any>) {
  const task = await prisma.task.findUnique({
    where: {id: taskId },
  })
  return res.json(task)
}

// PUT /api/post/:id
async function handlePUT(taskId: string, req:NextApiRequest, res: NextApiResponse<any>) {
  const task = await prisma.task.update({
    where: {id: taskId },
    data: {...req.body}
  })
  return res.json(task)
}

// DELETE /api/post/:id
async function handleDELETE(taskId: string, res: NextApiResponse<any>) {
  const task = await prisma.task.delete({
    where: {id: taskId },
  })
  return res.json(task)
}

