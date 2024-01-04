
import Container from '@/app/components/Container'
import OrderDetails from './OrderDetails'
import ListRating from '@/app/product/[productId]/ListRating'
import getOrderById from '@/actions/getOrderById'
import NullData from '@/app/components/NullData'



interface IParams {
  productId?: string
}



const OrderPage = async ({ params }: { params: IParams }) => {

  const order = await getOrderById(params)

if(!order) return <NullData title='No order exists'/>

  return (
    <div className='p-2'>
      < Container >
        <OrderDetails order={order} />

      </Container>
    </div>


  )
}

export default OrderPage