'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import Heading from '../components/Heading'
import MyButton from '../components/MyButton'
import ItemContent from './ItemContent'
import { formatPrice } from '@/utils/formatPrice'
import { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'


interface CartClientProps {
  currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {

  const router = useRouter()

  const { cartProducts, handleClearCart, cartTotalAmount, cartTotalQty } = useCart()

  if (!cartProducts || cartProducts.length === 0) {
    return <div className=' flex flex-col items-center '>
      <div className='text-2xl'> Your Cart Is Empty</div>
      < Link href='/'
        className='flex items-center gap-1  animate-pulse  border px-3 py-1 mt-2 rounded-md border-primary '
      >
        < MdArrowBack />
        <span>Back to Shop</span></Link>
    </div>
  }

  return (
    <div>
      <Heading title='Shopping Cart' center />

      {/* Cart Items */}
      <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 px-4'>
        <div className='col-span-2  justify-self-start  ' >Product</div>
        <div className='justify-self-center'>Price</div>
        <div className='justify-self-center'>Quantity</div>
        <div className='justify-self-end'>Total</div>

      </div>

      <div>
        {cartProducts && cartProducts.map((item) => {
          return <ItemContent key={item.id} item={item} />

        })}
      </div>

      {/*  Cart Menu */}
      <div className=' border-t  border-slate-200 py-4 flex justify-between gap-4'>
        <div className='w-24'>
          <MyButton label='Clear Cart' small outline onClick={() => { handleClearCart() }} />
        </div>

        <div className='text-sm flex flex-col gap-1 items-start'>
          <div className='flex justify-between w-full text-base font-semibold'>
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className='text-slate-500/80'>Taxes and Shipping calculated at checkout</p>

          <MyButton label={currentUser ? 'Checkout' : "Login To Checkout"} 
          outline={currentUser ? false: true}
          onClick={() => { currentUser ? router.push('/checkout'): router.push('/login')}} />

          < Link href='/'
            className='flex items-center gap-1 border px-3 py-1  rounded-md border-primary/40 mt-12'
          >
            < MdArrowBack />
            <span>Continue to Shopping</span></Link>

        </div>
      </div>

    </div>
  )
}

export default CartClient