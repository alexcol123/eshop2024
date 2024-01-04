
import Container from '@/app/components/Container'
import React from 'react'
import ProductDetails from './ProductDetails'
import ListRating from './ListRating'
import { products } from '@/utils/products'
import getProducts from '@/actions/getProducts'
import getProductsByID from '@/actions/getProductById'
import NullData from '@/app/components/NullData'
import AddRating from './AddRating'
import { getCurrentUser } from '@/actions/getCurrentUser'


interface IParams {
  productId?: string
}



const ProductPage = async ({ params }: { params: IParams }) => {


// const product = products.find(item => item.id === params.productId)
const product = await getProductsByID(params)
const user = await getCurrentUser()

if(!product) return < NullData title={"Opps !  There is no product with that ID"} />

  // const product = {
  //   id: "64a654593e91b8e73a351e9b",
  //   name: "iphone 14",
  //   description: "Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap\nCOMFORT AND STABILITY - Type with confidence on a keyboard crafted for comfort, stability, and precision",
  //   price: 2999,
  //   brand: "apple",
  //   category: "Phone",
  //   inStock: true,
  //   images: [
  //     {
  //       color: "White",
  //       colorCode: "#FFFFFF",
  //       image:
  //         "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/612mSuve9bL._AC_SL1500_.jpg",
  //     },
  //     {
  //       color: "Gray",
  //       colorCode: "#534f4f",
  //       image:
  //         "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51fz6WftJ0L._AC_SL1500_.jpg",
  //     },
  //     {
  //       color: "Blue",
  //       colorCode: "#2f3e9f",
  //       image:
  //         "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71M1Ndyl9SL._AC_SL1500_.jpg",
  //     },
  //     {
  //       color: "Pink",
  //       colorCode: "#86508b",
  //       image:
  //         "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/713JXKCCyVL._AC_SL1500_.jpg",
  //     },
  //   ],
  //   reviews: [
  //     {
  //       id: "6499b4887402b0efd394d8f3",
  //       userId: "6499b184b0e9a8c8709821d3",
  //       productId: "648437b38c44d52b9542e340",
  //       rating: 2,
  //       comment:
  //         "good enough. I like the camera and casing. the delivery was fast too.",
  //       createdDate: "2023-06-26T15:53:44.483Z",
  //       user: {
  //         id: "6499b184b0e9a8c8709821d3",
  //         name: "Bryan Jones",
  //         email: "example1@gmail.com",
  //         emailVerified: null,
  //         image:
  //           "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
  //         hashedPassword: null,
  //         createdAt: "2023-06-26T15:40:52.558Z",
  //         updatedAt: "2023-06-26T15:40:52.558Z",
  //         role: "USER",
  //       },
  //     },
  //     {
  //       id: "6499a110efe4e4de451c7edc",
  //       userId: "6475af156bad4917456e6e1e",
  //       productId: "648437b38c44d52b9542e340",
  //       rating: 3,
  //       comment: "I really liked it!!",
  //       createdDate: "2023-06-26T14:30:40.998Z",
  //       user: {
  //         id: "6475af156bad4917456e6e1e",
  //         name: "Charles Johnson",
  //         email: "example@gmail.com",
  //         emailVerified: null,
  //         image:
  //           "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
  //         hashedPassword: null,
  //         createdAt: "2023-05-30T08:08:53.979Z",
  //         updatedAt: "2023-05-30T08:08:53.979Z",
  //         role: "ADMIN",
  //       },
  //     },
  //   ],
  // }


  return (
    <div className='p-2'>

      < Container >
        <ProductDetails product={product} />

     
        <div className='flex flex-col mt-20 gap-2'>
         <AddRating product={product}  user={user}/>
          <ListRating product={product} />
        </div>
      </Container>
    </div>


  )
}

export default ProductPage