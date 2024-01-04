
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'

import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/actions/getCurrentUser'


export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

  const currentUser = await getCurrentUser()


  if (!currentUser ) {
    return NextResponse.error()
  }

  if ( currentUser.role !== 'ADMIN') {
    return NextResponse.error()
  }

  const product = await prisma.product.delete({
    where: { id: params.id },
  })

  return NextResponse.json(product)
}


