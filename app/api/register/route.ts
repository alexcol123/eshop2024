import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'
// import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const body = await request.json()
  console.log(body)

  const { name, email, password } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  console.log('hash')
  console.log(hashedPassword)

  const user = await prisma.user.create({
    data: { name, email, hashedPassword }
  })

  return NextResponse.json(user)
}


