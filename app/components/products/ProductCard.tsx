'use client'

import { formatPrice } from "@/utils/formatPrice"
import { truncateText } from "@/utils/truncateText"
import Image from "next/image"
import { useEffect, useState } from "react";
import Ratings from "../Ratings";
import Link from "next/link";



interface ProductCardProps {
  data: any
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

  const productRating = data?.reviews.reduce((acc: number, item: any) => (acc += item.rating / data.reviews.length), 0)


  return (
    <div className="col-span-1 cursor-pointer  
     border border-primary/20 rounded-2xl transition hover:scale-105 text-center text-sm mt-4
      ">

      <div className="card bg-base-100 shadow-xl">

        <Image src={data.images[0].image} alt={data.name} height={200} width={450} className=" h-48 w-full object-contain p-1" />

        <div className="card-body ">
          <div className="flex flex-col items-center justify-between  " >
            <h2 className="card-title">{truncateText(data.name)}</h2>
            <p className="text-xs md:text-sm my-1  opacity-70">{data?.description.substring(1, 70)}...</p>

            < Ratings productRating={productRating} />

            <Link href={`/product/${data.id}`} className="btn btn-sm btn-primary mt-8  ">View More</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductCard