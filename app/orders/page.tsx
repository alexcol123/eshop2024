

import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'

import getOrders from '@/actions/getOrders'
import OrderClient from './OrderClient'
import getOrdersByUserId from '@/actions/getOrdersByUserId'

const Orders = async () => {

  const currentUser = await getCurrentUser()

  // console.log(orders)


  if (!currentUser) {
    return < NullData title='Opps! Access denied' />
  }

  const orders = await getOrdersByUserId(currentUser.id)

  console.log(orders)

  if (!orders) {
    return < NullData title='Opps! Yout dont have any orders Yet' />
  }

  return (
    <div>
      <OrderClient orders={orders} />

    </div>
  )
}

export default Orders