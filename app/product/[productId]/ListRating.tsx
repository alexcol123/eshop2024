'use client'
import Avatar from '@/app/components/Avatar'
import Heading from '@/app/components/Heading'
import Ratings from '@/app/components/Ratings'
import moment from 'moment'
import React from 'react'

interface ListRatingProps {
  product: any
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {


if(product.reviews.length === 0) return null


  return (
    <div>

      <Heading title='Product Reviews' />
      <div className="text-sm mt-2">
        {product.reviews && product.reviews.map((review: any) => {
          return <div key={review.id} className='max-w-[300px] border border-slate-500/20 rounded-xl p-2  my-4' >
            <div className='flex flex-col gap-x-2  items-center justify-center '>
              <div className='flex items-center  gap-2'>
         
                  <Avatar user={review.user.name} src={review?.user.image} />
              
            <div className='flex flex-col  justify-center ml-2'>
            <div className='font-semibold'>{review?.user.name}</div>
                <div className='text-primary/70 text-xs' > {moment(review.createdDate).fromNow()}</div>
            </div>
              </div>

            </div>
            <div className="mt-2  ">
              < Ratings productRating={review.rating} />
              <div className='text-center'>{review.comment}</div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default ListRating