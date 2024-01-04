'use client'
import { CartProductType, SelectedImgType } from '@/app/product/[productId]/ProductDetails'
import Image from 'next/image'
import React from 'react'


interface ProductImageProps {
  cartProduct: CartProductType,
  product: any,
  handleColorSelect: (value: SelectedImgType) => void
}

const ProductImages: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect
}) => {



  return (
    <div className='grid grid-cols-6  gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] border-2 border-primary/20 p-1 rounded-2xl '>
      <div className='flex flex-col items-center  gap-4 cursor-pointer   h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] overflow-y-auto  '>
        {product.images.map((image: SelectedImgType, i: any) => {
          // console.log(image.image)
          return <div key={i} onClick={() => handleColorSelect(image)} className={`relative w-[80%] aspect-square-rounded border-primary  ${cartProduct.selectedImg.color === image.color && 'border'} `} >
            <Image src={image.image}
              alt={image.color}
              width={200} height={200}
              className='object-cover h-32 w-20'
            />
          </div>

        })}
      </div>

      <div className='col-span-5 relative bg-white'>
        <Image src={cartProduct.selectedImg.image} fill className='w-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px] '  alt={product.mame} />
      </div>
    </div>
  )
}

export default ProductImages