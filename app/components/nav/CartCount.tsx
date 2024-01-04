'use client'

import { CiShoppingCart } from 'react-icons/ci'
import { useCart } from '@/hooks/useCart'

import Link from 'next/link'
import React from 'react'

const CartCount = () => {
  const { cartTotalQty } = useCart()

  return (

    < div >
      <Link href='/cart' className='relative cursor-pointer'
      >
        <div className='text-3xl'>
          < CiShoppingCart />
        </div>
        {cartTotalQty > 0 && <span className='absolute -top-2 -right-3 bg-primary w-5 h-5 rounded-full text-sm  text-gray-200 flex items-center justify-center text-center animate-pulse'>   {cartTotalQty}</span>
        }
      </Link>
    </ div>
  )
}

export default CartCount