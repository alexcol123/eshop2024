export const revalidate  = 0

import Image from 'next/image'
import HomeBanner from './components/HomeBanner'
import Container from './components/Container'
// import { products } from '@/utils/products'
import { truncateText } from '../utils/truncateText'
import ProductCard from './components/products/ProductCard'
import getProducts, { IProductParams } from '@/actions/getProducts'
import NullData from './components/NullData'


interface HomeProps {
  searchParams: IProductParams
}

export default async function Home({ searchParams }: HomeProps) {

  const products = await getProducts(searchParams)


  // To shuffle products
  // if (products.length === 0) {
  //   return <NullData title={'Opps! No Products found. Click "ALL" to clear filters. '} />
  // }
  // // Fisher-Yates shuffle Algorithm

  // function shuffleArray(array: any) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));

  //     [array[i], array[j]] = [array[j], array[1]]
  //   }
  //   return array
  // }

  // const shuffleProducts = shuffleArray(products)


  return (
    <div className='p-2'>

      <Container >
        <div>
          <HomeBanner />
          <div className='grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4  lg:gap-8' >
            {products.map((product: any) => (

              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
