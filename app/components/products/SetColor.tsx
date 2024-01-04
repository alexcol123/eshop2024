'use client'
import { CartProductType, SelectedImgType } from '@/app/product/[productId]/ProductDetails'
import React from 'react'


interface SetColorProps {
  images: SelectedImgType[],
  cartProduct: CartProductType
  handleColorSelect: (value: SelectedImgType) => void
}

const SetColor: React.FC<SetColorProps> = ({ images, cartProduct, handleColorSelect }) => {


  return (

    <div>
      <div className='flex gap-4 items-center'>
        <span className='font-semibold'>Color</span>
        <div className='flex gap-1'>{images.map((image, i) => {
          return <div
          onClick={() => handleColorSelect(image)}
            key={i} className={`h-7 w-7 rounded-full border border-primary flex items-center justify-center ${cartProduct.selectedImg.color === image.color ? 'border-2 border-green-700 ' : 'border-none'}`}   >
            <div style={{ background: image.colorCode }} className={` h-5 w-5 rounded-full border-[1px] cursor-pointer`}></div>
          </div>
        })}</div>
      </div>

    </div>
  )
}

export default SetColor