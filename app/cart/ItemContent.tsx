'use client'

import React from 'react'
import { CartProductType } from '../product/[productId]/ProductDetails'
import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'
import { truncateText } from '@/utils/truncateText'
import Image from 'next/image'
import SetQuantity from '../components/products/SetQuantity'
import { useCart } from '@/hooks/useCart'


interface ItemContentProps {
  item: CartProductType
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {

  
  const { handleRemoveProductFromCart, handleQtyIncrease, handleQtyDecrease } = useCart()

  return (
    <div className='grid grid-cols-5 text-xs  md-text-sm gap-4 border border-slate-200 py-4 mb-4 items-center px-2'>
      <div className='col-span-2 justify-star flex  gap-2 md:gap-4 '>
        <Link href={`/product/${item.id}`}>
          <div className='relative w-16 aspect-square'>
            < Image src={item.selectedImg.image} alt={item.name} fill className=' object-contain' />
          </div>
        </Link>
        <div className='flex flex-col justify-between'>
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}</Link>

          <div>
            {item.selectedImg.color}
          </div>
          <div className="w-20 ">
            <button
              onClick={() => handleRemoveProductFromCart(item)}
              className="text-slate-500 underline">
              Remove
            </button>
          </div>
        </div>

      </div>
      <div className='justify-self-center'>{formatPrice(item.price)}</div>

      <div className='justify-self-center'>< SetQuantity cartCounter={true}
        cartProduct={item} handleQtyIncrease={() => { handleQtyIncrease(item)}} handleQtyDecrease={() => { handleQtyDecrease(item)}}

      /> </div>

      <div className='justify-self-end font-semibold'>{formatPrice(item.quantity * item.price)}</div>

    </div>
  )
}

export default ItemContent