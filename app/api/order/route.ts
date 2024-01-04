
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'



export const PUT = async (request: Request) => {

  const currentUser = await getCurrentUser()


  if (!currentUser ) {
    return NextResponse.error()
  }

  if ( currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  const body = await request.json()

  const { id, deliveryStatus } = body

  console.log(body)



  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus }
  })

  return NextResponse.json(order)
}





