import React from 'react'
import Summary from './Summary'

import getProducts from '@/actions/getProducts'
import getOrders from '@/actions/getOrders'
import getUsers from '@/actions/getUsers'
import Container from '../components/Container'
import BarGraph from './BarGraph'
import getGraphData from '@/actions/getGraphData'

const AdminPage = async () => {
  const products = await getProducts({ category: null })
  const orders = await getOrders()
  const users = await getUsers()

  const graphData = await getGraphData()

  return (
    <div className='p-8' >
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className='mt-4 mx-auto max-w-[1150px] bg-white p-2 rounded-md border-4 border-primary/70'>
          <BarGraph data={graphData} />
        </div>
      </Container>


    </div>
  )
}

export default AdminPage