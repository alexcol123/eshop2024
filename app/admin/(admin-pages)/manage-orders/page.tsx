

import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'
import ManageOrdersClient from './ManageOrdersClient'
import getOrders from '@/actions/getOrders'

const ManageOrders = async () => {

  const orders = await getOrders()
  const currentUser = await getCurrentUser()

  // console.log(orders)


  if (!currentUser || currentUser.role !== "ADMIN") {
    return < NullData title='Opps! Access denied' />
  }

  return (
    <div>
      <ManageOrdersClient orders={orders} />

    </div>
  )
}

export default ManageOrders